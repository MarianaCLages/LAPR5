import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, catchError, of } from "rxjs";

import { ICreateWarehouseDTO } from '../shared/createWarehouseDTO';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AddWarehouseService{
  baseURL = "https://localhost:5001/api/Warehouse";

  constructor(private http: HttpClient) {}

  addWarehouse(createWarehouse: ICreateWarehouseDTO){
    return this.http.post<HttpResponse<any>>(this.baseURL, createWarehouse);
  }

}
