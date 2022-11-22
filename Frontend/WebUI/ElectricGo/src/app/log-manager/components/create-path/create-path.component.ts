import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import IPathDTO from "../../../shared/pathDTO";
import {CreatePathServiceService} from "../../../services/create-path-service.service";
import {GetWarehouseServiceService} from "../../../services/get-warehouse-service.service";

@Component({
  selector: 'app-create-path',
  templateUrl: './create-path.component.html',
  styleUrls: ['./create-path.component.css']
})
export class CreatePathComponent implements OnInit {

//array of warehouses


  // filteredwarehouses: Observable<string>;
  myControl = new FormControl();
  initialWarehouse: any;
  destinationWarehouse: any;
  energyNeeded: any;
  distance: any;
  time: any;
  timeToCharge: any;
  warehouses: any;


  constructor(
    private createPathService: CreatePathServiceService,
    private getWarehouseService: GetWarehouseServiceService
  ) {
  }

  ngOnInit(): void {
    //fills the warehouses array with the warehouses from the backend
     this.warehouses = this.getWarehouseService.getWarehouses();


  }

  createTruck() {
    console.log(this.initialWarehouse);
    console.log(this.destinationWarehouse);
    console.log(this.energyNeeded);
    console.log(this.distance);
    console.log(this.time);
    console.log(this.timeToCharge);



    //creates the path DTO
    let pathDTO: IPathDTO = {
      beginningWarehouseId: this.initialWarehouse.AlphaNumId,
      endingWarehouseId: this.destinationWarehouse.AlphaNumId,
      energy: this.energyNeeded,
      distance: this.distance,
      time: this.time,
      chargingTime: this.timeToCharge
    };

    //clears the form
    this.initialWarehouse = null;
    this.destinationWarehouse = null;
    this.energyNeeded = null;
    this.distance = null;
    this.time = null;
    this.timeToCharge = null;

    //logs the pathDTO
    console.log(pathDTO);


    //sends the path DTO to the backend
    let errorOrSuccess = this.createPathService.createPath(pathDTO);
    console.log(errorOrSuccess);

    //if the path was created successfully, show a success message



  }

}
