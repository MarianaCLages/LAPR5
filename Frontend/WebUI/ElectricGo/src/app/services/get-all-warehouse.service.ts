import {HttpClient, HttpResponse} from '@angular/common/http';
import {ActivatedWarehouseDTO} from "../shared/ActivatedWarehouseDTO";
import { Injectable } from '@angular/core';
import { AppConfigServiceService } from './app-config-service.service';
import { GoogleApiCommunicationService } from './google-api-communication.service';

@Injectable({
  providedIn: 'root'
})
export class GetAllWarehouseService {
  constructor(private http: HttpClient,  private appConfigService: AppConfigServiceService,
    private service: GoogleApiCommunicationService) {}

  async getAllWarehouse(): Promise<any>{
    const getAllWarehouseURL = this.appConfigService.getWarehouseURL() + this.appConfigService.getAllWarehouses();

    const data = await fetch(getAllWarehouseURL,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': this.service.getJWT(),
      }
    })

    const result = (await data.json());

    return result;
  }

  getPathsByEndingWarehouse(designation: any): any {
    //set the http headers
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': this.service.getJWT()
    };

    //set the http options
    const options = {
      headers: headers
    };

    const getPathsByEndindWarehouseURL = this.appConfigService.getWarehouseURL() + this.appConfigService.getPathsWByEndingW();

    return this.http.get<ActivatedWarehouseDTO[]>(getPathsByEndindWarehouseURL + designation, options).toPromise();
  }

  activateWarehouse(id: any){

    //set the http headers
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': this.service.getJWT()
    };

    //set the http options
    const options = {
      headers: headers
    };


    const activateWarehousePath = this.appConfigService.getWarehouseURL() + this.appConfigService.getActivationWarehouse();

    return this.http.put<HttpResponse<any>>(activateWarehousePath + id, options);
  }

  desactivateWarehouse(id: any){
    //set the http headers
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': this.service.getJWT()
    };

    //set the http options
    const options = {
      headers: headers
    };

    const desactivateWarehousePath = this.appConfigService.getWarehouseURL() + this.appConfigService.getDesactivationWarehouse();

    return this.http.put<HttpResponse<any>>(desactivateWarehousePath + id, options);
  }


}
