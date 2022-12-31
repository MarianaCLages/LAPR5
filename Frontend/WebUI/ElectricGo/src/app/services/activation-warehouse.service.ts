import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { AppConfigServiceService } from "./app-config-service.service";

@Injectable({
  providedIn: 'root'
})

export class ActivationWarehouseService{
  constructor(private http: HttpClient,
    private appConfigService: AppConfigServiceService) {}

  desactivateWarehouse(id: any){
     //set the http headers
     const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    //set the http options
    const options = {
      headers: headers
    };

    const desactivateWarehousePath = this.appConfigService.getWarehouseURL() + this.appConfigService.getDesactivationWarehouse();

    return this.http.put<HttpResponse<any>>(desactivateWarehousePath + id, options);
  }

  activateWarehouse(id: any){

     //set the http headers
     const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    //set the http options
    const options = {
      headers: headers
    };

    const activateWarehousePath = this.appConfigService.getWarehouseURL() + this.appConfigService.getActivationWarehouse();

    return this.http.put<HttpResponse<any>>(activateWarehousePath + id, options);
  }
}
