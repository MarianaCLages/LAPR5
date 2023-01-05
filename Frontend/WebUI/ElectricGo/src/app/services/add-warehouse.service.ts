import { HttpClient, HttpResponse } from "@angular/common/http";
import { ICreateWarehouseDTO } from '../shared/createWarehouseDTO';
import { Injectable } from '@angular/core';
import { AppConfigServiceService } from "./app-config-service.service";
import { GoogleApiCommunicationService } from "./google-api-communication.service";

@Injectable({
  providedIn: 'root'
})

export class AddWarehouseService{
  constructor(private http: HttpClient,
    private appConfigService: AppConfigServiceService,
    private service: GoogleApiCommunicationService) {}

  addWarehouse(createWarehouse: ICreateWarehouseDTO){
    //set the http headers
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': this.service.getJWT(),
    };

    //set the http options
    const options = {
      headers: headers
    };

    const createPathURL = this.appConfigService.getWarehouseURL() + this.appConfigService.getAllWarehouses();

    return this.http.post<HttpResponse<any>>(createPathURL, createWarehouse, options);
  }

}
