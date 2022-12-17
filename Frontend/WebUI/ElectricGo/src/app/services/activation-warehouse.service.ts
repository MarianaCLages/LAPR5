import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, catchError, of } from "rxjs";

import { ICreateWarehouseDTO } from '../shared/createWarehouseDTO';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class ActivationWarehouseService{
  desactivationBaseURL = "http://localhost:5000/api/Warehouse/delete?delete=";
  activationBaseURL = "http://localhost:5000/api/Warehouse/activate?activate="

  constructor(private http: HttpClient) {}

  desactivateWarehouse(id: any){
    return this.http.put<HttpResponse<any>>(this.desactivationBaseURL + id,null);
  }

  activateWarehouse(id: any){
    return this.http.put<HttpResponse<any>>(this.activationBaseURL + id,null);
  }
}
