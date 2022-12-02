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

    console.log(this.orderAllURL);
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

    console.log(id);
    const strArr = id.split("/");

    //get the orders from the backend
    this.orderParamURL = this.appConfigService.getWarehouseURL() + "Order/search?nextId=" + strArr[0] + "&data=" + strArr[1];
    return this.http.get<IOrderDTO>(this.orderParamURL, options).toPromise();
  }

  getOrdersByDate(date: any) : any {
    //set the http headers
    const headers = {
    };

    //set the http options
    const options = {
      headers: headers
    };

    let dateStr : string = date;
    dateStr.replace("/", "-");
    const arr = dateStr.split("/");
    let correctDate = arr[0] + "/" + arr[2] + "/" + arr[1];

    //get the orders from the backend
    this.orderParamURL = this.appConfigService.getWarehouseURL() + "Order/byDate?data=" + correctDate;
    console.log(this.orderParamURL);
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
    this.orderParamURL = this.appConfigService.getWarehouseURL() +  "Order/byWarehouseID?warehouseId=" + warehouseID;;
    console.log(this.orderParamURL);
    return this.http.get<IOrderDTO>(this.orderParamURL, options).toPromise();
  }

  getOrdersByDateAndWarehouseID(orderFilterDate : string,warehouseID: string) : any {
    //set the http headers
    const headers = {
    };

    //set the http options
    const options = {
      headers: headers
    };

    orderFilterDate = orderFilterDate.trim();
    warehouseID = warehouseID.trim();

    let dateStr : string = orderFilterDate;
    dateStr.replace("/", "-");
    const arr = dateStr.split("/");
    let correctDate = arr[0] + "/" + arr[2] + "/" + arr[1];

    //get the orders from the backend
    this.orderParamURL = this.appConfigService.getWarehouseURL() +  "Order/Filtering?warehouseId=" + warehouseID + "&data=" + correctDate;
    console.log(this.orderParamURL);
    return this.http.get<IOrderDTO>(this.orderParamURL, options).toPromise();
  }
}
