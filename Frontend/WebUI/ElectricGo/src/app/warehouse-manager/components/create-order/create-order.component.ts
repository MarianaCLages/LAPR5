import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { AddOrderService } from 'src/app/services/add-order.service';
import { ICreateOrderDTO } from 'src/app/shared/createOrderDTO';

@Component({
  selector: 'app-create-order',
  templateUrl: './create-order.component.html',
  styleUrls: ['./create-order.component.css'],
  providers: [AddOrderService],
})

export class CreateOrderComponent implements OnInit {
  orderDate: any;
  orderMass: any;
  chargingTime: any;
  unloadingTime: any;
  warehouseId: any;
  res: any;
  showResponse: boolean = false;

  @Output()
  redirectEvent = new EventEmitter<string>();

  constructor(
    private location: Location,
    private addOrderService: AddOrderService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.location.back();
  }

  addOrder() {
    let order = {
      orderDate: this.orderDate,
      orderMass: this.orderMass,
      chargingTime: this.chargingTime,
      unloadingTime: this.unloadingTime,
      warehouseId: this.warehouseId
    };

    console.log(order);
    this.res = this.addOrderService.addOrder(
      order as ICreateOrderDTO
    );

    console.log(this.res.status);
    console.log(this.showResponse);
  }
}
