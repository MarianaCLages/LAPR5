import {Component, OnInit, ViewChild} from '@angular/core';
import { GetAllWarehouseService } from '../../../services/get-all-warehouse.service';
import {MatTableDataSource} from "@angular/material/table";
import IPackagingDTO from "../../../shared/pathDTO";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-get-all-warehouses',
  templateUrl: './get-all-warehouses.component.html',
  styleUrls: ['./get-all-warehouses.component.css']
})
export class GetAllWarehousesComponent implements OnInit {


  warehouses = new MatTableDataSource<IPackagingDTO>();

  displayedColumns: string[] = ['id', 'designation', 'city'];


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

  async ngOnInit() {
    let dataWarehouse = await this.getAllWarehouseService.getAllWarehouse();


    this.warehouses.data = dataWarehouse;
    this.warehouses.sort = this.sort;
    this.warehouses.paginator = this.paginator;


    console.log(dataWarehouse);

  }
  goBack() {
    window.history.back();
  }
}
