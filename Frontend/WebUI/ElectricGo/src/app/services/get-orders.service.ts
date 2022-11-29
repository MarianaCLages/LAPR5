import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import IOrderDTO from '../shared/orderDTO';

@Injectable({
  providedIn: 'root'
})
export class GetOrdersService {

  constructor(
    private http: HttpClient
  ) { }

  getOrders() : any {
    //set the http headers
    const headers = {
    };

    //set the http options
    const options = {
      headers: headers
    };

    //get the paths from the backend
    return this.http.get<IOrderDTO>('https://localhost:5001/api/Order', options);
  }
}
