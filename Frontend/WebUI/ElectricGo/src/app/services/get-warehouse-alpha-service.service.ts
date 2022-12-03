import {HttpClient, HttpResponse} from "@angular/common/http";
import { ICreateWarehouseDTO } from "../shared/createWarehouseDTO";
import { Injectable } from '@angular/core';
import { firstValueFrom } from "rxjs";
import {AppConfigServiceService} from "./app-config-service.service";

@Injectable({
  providedIn: 'root'
})
export class GetWarehouseAlphaService {

  baseURL= 'http://localhost:5000/api/Warehouse/byAlphaId?warehouseId=';

  constructor(private http: HttpClient) {}

  getWarehouses(alphaId : any){

    return this.http.get<HttpResponse<any>>(this.baseURL + alphaId);
  }
}
