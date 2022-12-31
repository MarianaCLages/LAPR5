import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IOrderDTO from '../shared/orderDTO';
import { AppConfigServiceService } from './app-config-service.service';

@Injectable({
  providedIn: 'root'
})
export class CreateOrderService {

  constructor(private http: HttpClient,
    private appConfigService: AppConfigServiceService) { }

  createOrder(orderDTO: IOrderDTO) {
     //set the http headers
     const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    //set the http options
    const options = {
      headers: headers
    };

    const createOrder = this.appConfigService.getWarehouseURL() + this.appConfigService.getAllOrdersURL();

    return this.http.post<HttpResponse<any>>(createOrder, orderDTO, options);
  }
}
