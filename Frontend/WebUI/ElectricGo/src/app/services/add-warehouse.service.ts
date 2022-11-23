import { HttpClient, HttpResponse } from '@angular/common/http';
import { ICreateWarehouseDTO } from '../shared/createWarehouseDTO';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AddWarehouseService{
  baseURL = "https://localhost:5001/api/Warehouse";

  constructor(private http: HttpClient) {}

  addWarehouse(createWarehouse: ICreateWarehouseDTO){
    const headers = { 'content-type': 'application/json' };

    const body = JSON.stringify(createWarehouse);
    console.log(body);

    const data = this.http
      .post<ICreateWarehouseDTO>(this.baseURL,body,{
        headers: headers,
        observe: 'response',
    }).subscribe(
      response=>{
        console.log(response);
      }
      );


    return data;
  }

}
