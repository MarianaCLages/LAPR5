import { Component, OnInit } from '@angular/core';

import { CreatePathServiceService } from "../../../services/create-path-service.service";
import { GetWarehouseServiceService } from "../../../services/get-warehouse-service.service";
import IPathDTO from "../../../shared/pathDTO";

@Component({
  selector: 'app-create-path', templateUrl: './create-path.component.html', styleUrls: ['./create-path.component.css']
})
export class CreatePathComponent implements OnInit {


  initialWarehouse: any;
  destinationWarehouse: any;
  energyNeeded: any;
  distance: any;
  time: any;
  timeToCharge: any;
  warehouses: any[] = [];
  errorMessage: any;
  error: boolean = false;
  success: any;
  successMessage: any;


  constructor(private createPathService: CreatePathServiceService, private getWarehouseService: GetWarehouseServiceService) {
  }

  ngOnInit(): void {
    //gets the warehouses from the backend
    this.getWarehouseService.getWarehouses().then((data: any) => {
      this.warehouses = data;
    });
    this.error = false;

  }

  createTruck() {
    //clears the error message
    this.errorMessage = "";
    this.error = false;

    //clears the success message
    this.success = "";

    //creates the path DTO
    let pathDTO: IPathDTO = {
      beginningWarehouseId: this.initialWarehouse.alphaNumId,
      endingWarehouseId: this.destinationWarehouse.alphaNumId,
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


    //sends the path DTO to the backend

    let errorOrSuccess: any = this.createPathService.createPath(pathDTO);
    errorOrSuccess.subscribe((data: any) => {
      console.log(data);
      this.success = true;
      this.successMessage = "Path created successfully";
      this.goBack();
    },
      (error: any) => {
        this.error = true;
        if (error.status == 400) {
          this.errorMessage = error.error;
          alert(this.errorMessage);
        } else {
          if (error.status == 500) {

            this.errorMessage = error.error.errors.message;
            alert(this.errorMessage);
          } else {
            this.errorMessage = "An unknown error has ocurred";
            alert(this.errorMessage);
          }
        }
      });
  }

  goBack() {
    window.history.back();
  }

}
