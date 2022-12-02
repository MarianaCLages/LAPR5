import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IOrderDTO from '../shared/orderDTO';
import { AppConfigServiceService } from './app-config-service.service';

@Injectable({
  providedIn: 'root'
})
export class GetOrdersService {

  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigServiceService,
  ) {}

  private orderAllURL : any;
  private orderParamURL : any;

  getOrders() : any {
    //set the http headers
    const headers = {
    };

    //set the http options
    const options = {
      headers: headers
    };

    //get the orders from the backend
    this.orderAllURL = this.appConfigService.getWarehouseURL() + this.appConfigService.getAllOrdersURL();
    return this.http.get<IOrderDTO>(this.orderAllURL, options).toPromise();
  }

  getOrdersByID(id: string) : any {
    //set the http headers
    const headers = {
    };

    //set the http options
    const options = {
      headers: headers
    };

    //get the orders from the backend
    this.orderParamURL = this.appConfigService.getWarehouseURL() + this.appConfigService.getOrderByParamURL() + "/id" + id;
    return this.http.get<IOrderDTO>(this.orderParamURL, options).toPromise();
  }

  getOrdersByDate(date: Date) : any {
    //set the http headers
    const headers = {
    };

    //set the http options
    const options = {
      headers: headers
    };

    //get the orders from the backend
    this.orderParamURL = this.appConfigService.getWarehouseURL() + this.appConfigService.getOrderByParamURL() + "/date" + date;
    return this.http.get<IOrderDTO>(this.orderParamURL, options).toPromise();
  }

  getOrdersByWarehouseID(warehouseID: string) : any {
    //set the http headers
    const headers = {
    };

    //set the http options
    const options = {
      headers: headers
    };

    //get the orders from the backend
    this.orderParamURL = this.appConfigService.getWarehouseURL() + this.appConfigService.getOrderByParamURL() + "/warehouseID" + warehouseID;
    return this.http.get<IOrderDTO>(this.orderParamURL, options).toPromise();
  }
}
