import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AddPackagingService } from 'src/app/services/add-packaging.service';
import { IPackagingDTO } from 'src/app/shared/packagingDTO';
import { GetTrucksService } from 'src/app/services/get-trucks.service';
import { GetOrdersService } from 'src/app/services/get-orders.service';
import IOrderDTO from 'src/app/shared/orderDTO';

@Component({
  selector: 'app-add-packaging',
  templateUrl: './add-packaging.component.html',
  styleUrls: ['./add-packaging.component.css'],
  providers: [AddPackagingService,GetOrdersService],
})
export class AddPackagingComponent implements OnInit {
  orderRef: any;
  truckRef: any;
  posX: any;
  posY: any;
  posZ: any;

  orders: any[] = [];
  trucks: any[] = [];
  errorMessage: any;
  error: boolean = false;
  success: any;
  successMessage: any;

  @Output()
  redirectEvent = new EventEmitter<string>();

  constructor(
    private addPackagingService: AddPackagingService,
    private getTrucksService: GetTrucksService,
    private getOrdersService: GetOrdersService
  ) {}

  ngOnInit(): void {
    this.getOrdersService.getOrders().then((data: IOrderDTO[]) => {
      this.orders = data;
    });

    this.trucks = this.getTrucksService.getTrucks();

    console.log(this.orders);
    console.log('a');
  }

  goBack() {
    window.history.back();
  }

  addPackaging() {

    //clears the error message
    this.errorMessage = "";
    this.error = false;

    //clears the success message
    this.success = "";

    //creates the path DTO
    let packagingDTO: IPackagingDTO = {
      orderRef: this.orderRef,
      truckRef: this.truckRef,
      pos3DX: this.posX,
      pos3DY: this.posY,
      pos3DZ: this.posZ
    };

    //clears the form
    this.orderRef = null;
    this.truckRef = null;
    this.posX = null;
    this.posY = null;
    this.posZ = null;

     //send the order DTO to the backend
     let errorOrSuccess: any = this.addPackagingService.addPackaging(packagingDTO);
     errorOrSuccess.subscribe(
       (data: any) => {
         this.success = true;
       },
       //transforms into a http error
       (error: any) => {
         this.error = true;
         if (error.status == 400) {
           this.errorMessage = error.error.message;
         } else {
           if (error.status == 500) {
             this.errorMessage = error.error.errors.message;
           } else {
             this.errorMessage = "Unknown error!";
           }
         }
       }
     );

  }
}
