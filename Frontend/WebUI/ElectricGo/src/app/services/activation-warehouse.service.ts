import { HttpClient, HttpResponse } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { AppConfigServiceService } from "./app-config-service.service";
import { GoogleApiCommunicationService } from "./google-api-communication.service";

@Injectable({
  providedIn: 'root'
})

export class ActivationWarehouseService{
  constructor(private http: HttpClient,
    private appConfigService: AppConfigServiceService,
    private service: GoogleApiCommunicationService) {}

  desactivateWarehouse(id: any){
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

    const desactivateWarehousePath = this.appConfigService.getWarehouseURL() + this.appConfigService.getDesactivationWarehouse();

    console.log("AAAA")

    return this.http.put<HttpResponse<any>>(desactivateWarehousePath + id, options);
  }

  activateWarehouse(id: any){

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

    const activateWarehousePath = this.appConfigService.getWarehouseURL() + this.appConfigService.getActivationWarehouse();

    return this.http.put<HttpResponse<any>>(activateWarehousePath + id, options);
  }
}
