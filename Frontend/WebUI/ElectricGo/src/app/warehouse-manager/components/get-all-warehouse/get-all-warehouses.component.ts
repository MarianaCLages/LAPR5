import { Component, OnInit } from '@angular/core';
import { GetAllWarehouseService } from '../../../services/get-all-warehouse.service';

@Component({
  selector: 'app-get-all-warehouses',
  templateUrl: './get-all-warehouses.component.html',
  styleUrls: ['./get-all-warehouses.component.css']
})
export class GetAllWarehousesComponent implements OnInit {

  warehouses: any [] = [];
  warehousesAsString: any;
  errorMessage: any;
  error: boolean = false;

  constructor(
    private getAllWarehouseService: GetAllWarehouseService
  ) { }

  ngOnInit(): void {
    this.error = false;
  }

  async getAllWarehouse() {
    this.warehouses = await this.getAllWarehouseService.getAllWarehouse();
    let stringMethod: string;
    stringMethod = "";


    for(let i = 0; i < this.warehouses.length; i++){
      console.log(stringMethod);

    }

    this.warehousesAsString = "\nAlphaID:"+ this.warehouses[0].alphaNumId +"Door Number:"+ this.warehouses[0].doorNumber + "\nPostal Code:"+ this.warehouses[0].postalCode;
    console.log(this.warehousesAsString);

  }
  goBack() {
    window.history.back();
  }
}
