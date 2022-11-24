import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICreateOrderDTO } from '../shared/createOrderDTO';

@Injectable({
  providedIn: 'root'
})
export class AddOrderService {
  baseUrl = 'https://localhost:5001/api/Order';

  constructor(private http: HttpClient) { }

  addOrder(createOrder: ICreateOrderDTO) {
    const headers = { 'content-type': 'application/json'};

    const body = JSON.stringify(createOrder);
    console.log(body);

    const data = this.http.post<ICreateOrderDTO>(this.baseUrl, body, {
      headers: headers,
      observe: 'response',
    }).subscribe(data => {console.log(data);});

    return data;
  }
}
