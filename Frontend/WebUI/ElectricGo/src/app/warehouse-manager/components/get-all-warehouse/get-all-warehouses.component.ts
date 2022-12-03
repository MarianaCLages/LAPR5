import {Component, OnInit, ViewChild} from '@angular/core';
import { GetAllWarehouseService } from '../../../services/get-all-warehouse.service';
import {MatTableDataSource} from "@angular/material/table";
import IPackagingDTO from "../../../shared/pathDTO";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import IPathDTO from "../../../shared/pathDTO";
import {ICreateWarehouseDTO} from "../../../shared/createWarehouseDTO";

@Component({
  selector: 'app-get-all-warehouses',
  templateUrl: './get-all-warehouses.component.html',
  styleUrls: ['./get-all-warehouses.component.css']
})
export class GetAllWarehousesComponent implements OnInit {


  warehouses = new MatTableDataSource<ICreateWarehouseDTO>();
  designation: any;

  displayedColumns: string[] = ['alphaNumId', 'designation', 'street','postalCode','latitudeDegree','latitudeMinute','latitudeSecond','longitudeDregree','longitudeMinute','longitudeSecond'];
  options: string[] = [
    'Warehouse by Designation',
    'All Warehouses',
  ];
  filterOption: any;
  // @ts-ignore
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator ;
  // @ts-ignore
  @ViewChild(MatSort, {static: true}) sort: MatSort ;
  //warehouses: any [] = [];
  warehousesAsString: any;
  errorMessage: any;
  error: boolean = false;

  constructor(
    private getAllWarehouseService: GetAllWarehouseService
  ) { }

  ngAfterViewInit() {
    // @ts-ignore
    this.warehouses.paginator = this.paginator;
  }

  async ngOnInit(): Promise<void> {
    let dataWarehouse = await this.getAllWarehouseService.getAllWarehouse();


    this.warehouses.data = dataWarehouse;
    this.warehouses.sort = this.sort;
    this.warehouses.paginator = this.paginator;
      }

  async chooseFilter() {
    //clear the form
    console.log(this.filterOption);
    this.designation = null;
    if (this.filterOption == "All Warehouses") {
      let dataWarehouse = await this.getAllWarehouseService.getAllWarehouse();


      this.warehouses.data = dataWarehouse;
      this.warehouses.sort = this.sort;
      this.warehouses.paginator = this.paginator;


      console.log(dataWarehouse);}
    }

  async getWarehouseByFiltrer() {

    if (this.filterOption == "Warehouse by Designation") {
      this.getAllWarehouseService.getPathsByEndingWarehouse(this.designation).then((data: ICreateWarehouseDTO[]) => {
          this.warehouses.data = data;
        },
        (error: any) => {
          alert(error.error);
        });
    }
    else if (this.filterOption == "All Warehouses") {
      let dataWarehouse = await this.getAllWarehouseService.getAllWarehouse();


      this.warehouses.data = dataWarehouse;
      this.warehouses.sort = this.sort;
      this.warehouses.paginator = this.paginator;
    }
  }

  goBack() {
    window.history.back();
  }

}
