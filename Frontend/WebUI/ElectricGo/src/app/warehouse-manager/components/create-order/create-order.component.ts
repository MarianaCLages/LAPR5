import { Component, OnInit } from '@angular/core';
import { CreateOrderService } from 'src/app/services/create-order.service';
import { ICreateOrderDTO } from 'src/app/shared/createOrderDTO';
import { GetWarehouseServiceService } from 'src/app/services/get-warehouse-service.service';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css'],
  providers: [CreateOrderService, GetWarehouseServiceService]
})

export class CreateOrderComponent implements OnInit {
  orderId: any;
  orderDate: any;
  orderMass: any;
  loadingTime: any;
  unloadingTime: any;
  warehouseId: any;
  warehouses: any[] = [];
  errorMessage: any;
  error: boolean = false;
  success: any;
  successMessage: any;

  constructor(
    private createOrderService: CreateOrderService,
    private getWarehouseService: GetWarehouseServiceService
  ) { }

  ngOnInit(): void {
    this.warehouses = this.getWarehouseService.getWarehouses();
    this.error = false;
  }

  createOrder() {
    //clears the error message
    this.errorMessage = "";
    this.error = false;

    //clears the success message
    this.success = "";

    //creates the order DTO
    let orderDTO: ICreateOrderDTO = {
      orderId: this.orderId,
      orderDate: this.orderDate,
      orderMass: this.orderMass,
      chargingTime: this.loadingTime,
      unloadingTime: this.unloadingTime,
      warehouseId: this.warehouseId.alphaNumId
    };

    //clears the form
    this.orderDate = null;
    this.orderMass = null;
    this.loadingTime = null;
    this.unloadingTime = null;
    this.warehouseId = null;

    //send the order DTO to the backend
    let errorOrSuccess: any = this.createOrderService.createOrder(orderDTO);
    errorOrSuccess.subscribe(
      (data: any) => {
        this.success = true;
        this.successMessage = "Order created successfully with the ID " + this.orderId;
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

  goBack() {
    window.history.back();
  }
}
