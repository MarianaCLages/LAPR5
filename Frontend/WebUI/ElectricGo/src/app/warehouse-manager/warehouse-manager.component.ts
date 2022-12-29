import {Component, NgZone, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { Location } from '@angular/common';
import { AddWarehouseService } from '../services/add-warehouse.service'
import { CreateOrderService } from '../services/create-order.service';
import { GetOrdersService } from '../services/get-orders.service';
import { GoogleApiCommunicationService } from '../services/google-api-communication.service';

@Component({
  selector: 'app-warehouse-manager',
  templateUrl: './warehouse-manager.component.html',
  styleUrls: ['./warehouse-manager.component.css'],
  providers: [AddWarehouseService, CreateOrderService, GetOrdersService]
})
export class WarehouseManagerComponent implements OnInit {

  private validRoles: string[] = ['WarehouseManager', 'Admin'];

  constructor(private router: Router, private location: Location,
    private service: GoogleApiCommunicationService,
    private _ngZone: NgZone) { }

  ngOnInit(): void {

    let boolValue = this.service.isAuthenticated(this.validRoles);

    if(!boolValue){
      this.logout();
    }
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

  listOrders(){
    //route to list orders menu
    let opt = 'listOrders';
    //this.redirectEvent.emit(opt);
    const url = 'WarehouseManager/' + opt;
    this.router.navigate([url]).then(r => console.log(r));
  }

  goTo(destination: any) {
    //changes the route to the destination
    this.router.navigate([destination]).then(r => console.log(r));
  }

  public logout() {
    this.service.signOutExternal();
    this.service.cleanCookies();
    this._ngZone.run(() => {
      this.router.navigate(['/']).then((r) => window.location.reload());
    });
  }

}
