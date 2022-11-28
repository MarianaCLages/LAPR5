import {Component, OnInit, ViewChild} from '@angular/core';
import { GetWarehouseAlphaService} from "../../../services/get-warehouse-alpha-service.service";
import {MatTableDataSource} from "@angular/material/table";
import IPackagingDTO from "../../../shared/pathDTO";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-get-warehouses',
  templateUrl: './get-warehouse.component.html',
  styleUrls: ['./get-warehouse.component.css']
})
export class GetWarehouseComponent implements OnInit {




  warehouse = new MatTableDataSource<IPackagingDTO>();

  displayedColumns: string[] = ['alphaNumId', 'designation', 'street','postalCode','latitudeDegree','latitudeMinute','latitudeSecond','longitudeDregree','longitudeMinute','longitudeSecond'];

  // @ts-ignore
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator ;
  // @ts-ignore
  @ViewChild(MatSort, {static: true}) sort: MatSort ;
  //warehouses: any [] = [];
  warehousesAsString: any;
  errorMessage: any;
  error: boolean = false;
  alphaId : any;
  dataWarehouse: any

  constructor(
    private getWarehouseServiceService: GetWarehouseAlphaService
  ) { }

  ngAfterViewInit() {
    // @ts-ignore
    this.warehouse.paginator = this.paginator;
  }

  async ngOnInit() {
  }

  async getWarehouse() {
    let dataWarehouse = await this.getWarehouseServiceService.getWarehouses(this.alphaId);


    this.warehouse.data = dataWarehouse;
    this.warehouse.sort = this.sort;
    this.warehouse.paginator = this.paginator;


    console.log(dataWarehouse);
  }
  goBack() {
    window.history.back();
  }


}
