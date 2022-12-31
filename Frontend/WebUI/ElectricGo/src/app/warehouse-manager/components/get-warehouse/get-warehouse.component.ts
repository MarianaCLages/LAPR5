import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import { GetWarehouseAlphaService} from "../../../services/get-warehouse-alpha-service.service";
import {MatTableDataSource} from "@angular/material/table";
import IPackagingDTO from "../../../shared/pathDTO";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {ActivatedWarehouseDTO} from "../../../shared/ActivatedWarehouseDTO";
import { GoogleApiCommunicationService } from 'src/app/services/google-api-communication.service';
import { RedirectPagesService } from 'src/app/services/redirect-pages.service';

@Component({
  selector: 'app-get-warehouses',
  templateUrl: './get-warehouse.component.html',
  styleUrls: ['./get-warehouse.component.css'],
  providers: [GetWarehouseAlphaService]
})
export class GetWarehouseComponent implements OnInit {




  warehouse = new MatTableDataSource<ActivatedWarehouseDTO >();

  displayedColumns: string[] = ['alphaNumId', 'designation', 'street','postalCode','latitudeDegree','latitudeMinute','latitudeSecond','longitudeDregree','longitudeMinute','longitudeSecond','activated'];

  // @ts-ignore
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator ;
  // @ts-ignore
  @ViewChild(MatSort, {static: true}) sort: MatSort ;
  //warehouses: any [] = [];
  warehousesAsString: any;
  errorMessage: any;
  successMessage: any;
  res: any;
  error: boolean = false;
  success: any;
  @Output()
  redirectEvent = new EventEmitter<string>();
  alphaId : any;
  dataWarehouse: any

  public showPage: boolean = false;
  public validRoles: string[] = ["WarehouseManager", 'Admin'];

  constructor(
    private getWarehouseServiceService: GetWarehouseAlphaService,
    private service: GoogleApiCommunicationService,
    private redirect: RedirectPagesService
  ) { }

  ngAfterViewInit() {
    // @ts-ignore
    this.warehouse.paginator = this.paginator;
  }

  async ngOnInit() {
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
  }

  getWarehouse() {

    //clears the error message
    this.errorMessage = "";
    this.error = false;

    //clears the success message
    this.success = "";

    let errorOrSuccess: any = this.getWarehouseServiceService.getWarehouses(this.alphaId);

    errorOrSuccess.then((data: any) => {
        this.success = true;
        this.successMessage = "Get Warehouse Successful!";

        let warehouseArray = [];
        let warehouseDTO = new ActivatedWarehouseDTO(data.latitudeDegree,data.latitudeMinute,data.latitudeSecond,data.longitudeDregree,data.longitudeMinute,data.longitudeSecond,data.designation,data.street,data.doorNumber,data.postalCode,data.city,data.country,data.alphaNumId,data.activated);

        warehouseArray.push(warehouseDTO);

        this.warehouse.data = warehouseArray;
        this.warehouse.sort = this.sort;
        this.warehouse.paginator = this.paginator;

      }, //transforms into a http error
      (error: any) => {
        this.error = true;
        if (error.status == 400) {
          this.errorMessage = error.error;
        } else {
          if (error.status == 500) {

            this.errorMessage = error.error.errors.message;
          } else {
            this.errorMessage = "An unknown error has ocurred";
          }
        }
      });

  }
  goBack() {
    window.history.back();
  }


}
