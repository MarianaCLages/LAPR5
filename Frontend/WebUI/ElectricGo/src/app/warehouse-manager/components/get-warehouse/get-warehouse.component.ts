import { Component, OnInit } from '@angular/core';
import { GetWarehouseAlphaService} from "../../../services/get-warehouse-alpha-service.service";

@Component({
  selector: 'app-get-warehouses',
  templateUrl: './get-warehouse.component.html',
  styleUrls: ['./get-warehouse.component.css']
})
export class GetWarehouseComponent implements OnInit {

  warehouse: any;
  warehouseAsString: any;
  alphaNumericId: string | undefined;
  errorMessage: any;
  error: boolean = false;

  constructor(
    private getWarehouseServiceService: GetWarehouseAlphaService
  ) { }

  ngOnInit(): void {
    this.error = false;
  }

  async getWarehouse() {
    this.warehouse = await this.getWarehouseServiceService.getWarehouses(this.alphaNumericId);

    this.warehouseAsString = "\nAlphaID: "+ this.warehouse.alphaNumId +"\nDoor Number:"+ this.warehouse.doorNumber + "\nPostal Code: "+ this.warehouse.postalCode + "\n\n\n";



    //this.warehousesAsString = "\nAlphaID:"+ this.warehouses[0].alphaNumId +"Door Number:"+ this.warehouses[0].doorNumber + "\nPostal Code:"+ this.warehouses[0].postalCode;
    console.log(this.warehouseAsString);

  }
  goBack() {
    window.history.back();
  }
}
