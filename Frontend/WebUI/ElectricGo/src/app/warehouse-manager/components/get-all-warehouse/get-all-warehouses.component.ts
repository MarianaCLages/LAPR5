import { Component, OnInit, ViewChild } from '@angular/core';
import { GetAllWarehouseService } from '../../../services/get-all-warehouse.service';
import { MatTableDataSource } from '@angular/material/table';
import IPackagingDTO from '../../../shared/pathDTO';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import IPathDTO from '../../../shared/pathDTO';
import { ICreateWarehouseDTO } from '../../../shared/createWarehouseDTO';
import { ActivatedWarehouseDTO } from '../../../shared/ActivatedWarehouseDTO';
import { GoogleApiCommunicationService } from 'src/app/services/google-api-communication.service';
import { RedirectPagesService } from 'src/app/services/redirect-pages.service';

@Component({
  selector: 'app-get-all-warehouses',
  templateUrl: './get-all-warehouses.component.html',
  styleUrls: ['./get-all-warehouses.component.css'],
})
export class GetAllWarehousesComponent implements OnInit {
  warehouses = new MatTableDataSource<ActivatedWarehouseDTO>();
  designation: any;

  displayedColumns: string[] = [
    'alphaNumId',
    'designation',
    'street',
    'postalCode',
    'latitudeDegree',
    'latitudeMinute',
    'latitudeSecond',
    'longitudeDregree',
    'longitudeMinute',
    'longitudeSecond',
    'activated',
    'Actions',
  ];
  options: string[] = ['Warehouse by Designation', 'All Warehouses'];
  filterOption: any;
  // @ts-ignore
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  //warehouses: any [] = [];
  warehousesAsString: any;
  errorMessage: any;
  error: boolean = false;

  public showPage: boolean = false;
  public validRoles: string[] = ['WarehouseManager', 'Admin'];

  constructor(
    private getAllWarehouseService: GetAllWarehouseService,
    private service: GoogleApiCommunicationService,
    private redirect: RedirectPagesService
  ) {}

  ngAfterViewInit() {
    // @ts-ignore
    this.warehouses.paginator = this.paginator;
  }

  async ngOnInit(): Promise<void> {
    this.showPage = false;
    let boolValue = await this.service.isAuthenticated(this.validRoles);

    if (!boolValue.exists) {
      this.redirect.forbiddenPage();
    }

    if (!boolValue.valid) {
      this.redirect.lockedPage();
    }

    if (!boolValue.exists && !boolValue.valid) {
      this.redirect.logout();
    }

    this.showPage = true;

    let dataWarehouse = await this.getAllWarehouseService.getAllWarehouse();

    this.warehouses.data = dataWarehouse;
    this.warehouses.sort = this.sort;
    this.warehouses.paginator = this.paginator;
  }

  async chooseFilter() {
    //clear the form
    console.log(this.filterOption);
    this.designation = null;
    if (this.filterOption == 'All Warehouses') {
      let dataWarehouse = await this.getAllWarehouseService.getAllWarehouse();

      this.warehouses.data = dataWarehouse;
      this.warehouses.sort = this.sort;
      this.warehouses.paginator = this.paginator;

      console.log(dataWarehouse);
    }
  }

  async getWarehouseByFiltrer() {
    if (this.filterOption == 'Warehouse by Designation') {
      this.getAllWarehouseService
        .getPathsByEndingWarehouse(this.designation)
        .then(
          (data: ActivatedWarehouseDTO[]) => {
            this.warehouses.data = data;
          },
          (error: any) => {
            alert(error.error);
          }
        );
    } else if (this.filterOption == 'All Warehouses') {
      let dataWarehouse = await this.getAllWarehouseService.getAllWarehouse();

      this.warehouses.data = dataWarehouse;
      this.warehouses.sort = this.sort;
      this.warehouses.paginator = this.paginator;
    }
  }

  goBack() {
    window.history.back();
  }


  desactivateUser(warehouse: any) {
    this.errorMessage = '';
    this.error = false;
    var errorOrSuccess;

    if(warehouse.activated == 1) {
      errorOrSuccess = this.getAllWarehouseService.desactivateWarehouse(warehouse.alphaNumId);
      }
    else{
      errorOrSuccess = this.getAllWarehouseService.activateWarehouse(warehouse.alphaNumId);
    }

    errorOrSuccess.subscribe(
      (data: any) => {
        this.getAllWarehouseService.getAllWarehouse().then(
          (data: any) => {
            this.warehouses.data = data;
          },
          (error: any) => {
            this.error = true;
            if (error.status == 400) {
              this.errorMessage = error.error;
            } else {
              if (error.status == 500) {
                this.errorMessage = error.error.errors.message;
              } else {
                this.errorMessage = 'Unknown error!';
              }
            }
          }
        );
      }, //transforms into a http error
      (error: any) => {
        this.error = true;
        if (error.status == 400) {
          this.errorMessage = error.error;
        } else {
          if (error.status == 500) {
            this.errorMessage = error.error.errors.message;
          } else {
            this.errorMessage = 'An unknown error has ocurred';
          }
        }
      }
    );

    this.warehouses.paginator = this.paginator;
  }
}
