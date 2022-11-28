import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { Location } from '@angular/common';
import { AddWarehouseService } from '../services/add-warehouse.service'
import { CreateOrderService } from '../services/create-order.service';

@Component({
  selector: 'app-warehouse-manager',
  templateUrl: './warehouse-manager.component.html',
  styleUrls: ['./warehouse-manager.component.css'],
  providers: [AddWarehouseService, CreateOrderService]
})
export class WarehouseManagerComponent implements OnInit {
  
  constructor(private router: Router, private location: Location) { }

  ngOnInit(): void {
  }

  addWarehouse(){
    //route to add packaging menu
    let opt = 'addWarehouse';
    //this.redirectEvent.emit(opt);
    const url = 'WarehouseManager/' + opt;
    this.router.navigate([url]).then(r => console.log(r));
  }

  createOrder(){
    //route to add order menu
    let opt = 'createOrder';
    //this.redirectEvent.emit(opt);
    const url = 'WarehouseManager/' + opt;
    this.router.navigate([url]).then(r => console.log(r));
  }

  goTo(destination: any) {
    //changes the route to the destination
    this.router.navigate([destination]).then(r => console.log(r));
  }

  logout() {
    this.location.back();
  }
}
