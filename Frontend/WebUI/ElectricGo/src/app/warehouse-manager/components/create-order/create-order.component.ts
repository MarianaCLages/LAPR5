import { Component, OnInit } from '@angular/core';
import { CreateOrderService } from 'src/app/services/create-order.service';
import { GetWarehouseServiceService } from 'src/app/services/get-warehouse-service.service';
import { GoogleApiCommunicationService } from 'src/app/services/google-api-communication.service';
import { RedirectPagesService } from 'src/app/services/redirect-pages.service';
import IOrderDTO from 'src/app/shared/orderDTO';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css']
})

export class CreateOrderComponent implements OnInit {
  identifier: any;
  orderDate: any;
  orderMass: any;
  chargingTime: any;
  unloadingTime: any;
  warehouseId: any;
  warehouses: any[] = [];
  errorMessage: any;
  error: boolean = false;
  success: any;
  successMessage: any;

  public showPage: boolean = false;

  private validRoles: string[] = ['WarehouseManager', 'Admin'];

  constructor(
    private createOrderService: CreateOrderService,
    private getWarehouseService: GetWarehouseServiceService,
    private service: GoogleApiCommunicationService,
    private redirect: RedirectPagesService
  ) { }

  async ngOnInit(): Promise<void> {
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

    this.getWarehouseService.getWarehouses().then((data: any) => {
      this.warehouses = data;
    });
    this.error = false;
  }

  createOrder() {
    //clears the error message
    this.errorMessage = "";
    this.error = false;

    //clears the success message
    this.success = "";

    //creates the order DTO
    let orderDTO: IOrderDTO = {
      identifier: this.identifier,
      orderDate: this.orderDate,
      orderMass: this.orderMass,
      chargingTime: this.chargingTime,
      unloadingTime: this.unloadingTime,
      warehouseId: this.warehouseId.alphaNumId
    };

    //clears the form
    this.orderDate = null;
    this.orderMass = null;
    this.chargingTime = null;
    this.unloadingTime = null;
    this.warehouseId = null;

    //send the order DTO to the backend
    let errorOrSuccess: any = this.createOrderService.createOrder(orderDTO);
    errorOrSuccess.subscribe(
      (data: any) => {
        this.success = true;
        this.identifier = data.identifier;
        this.successMessage = "Order created successfully with the ID " + this.identifier;
      },
      //transforms into a http error
      (error: any) => {
        this.error = true;
        if (error.status == 400) {
          this.errorMessage = error.error;
        } else {
          if (error.status == 500) {
            this.errorMessage = error.error.errors.message;
          } else {
            this.errorMessage = "An unknown error has occurred!";
          }
        }
      }
    );
  }

  goBack() {
    window.history.back();
  }
}
