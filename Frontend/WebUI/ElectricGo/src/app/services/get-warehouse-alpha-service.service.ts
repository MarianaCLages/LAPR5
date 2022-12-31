import {HttpClient} from "@angular/common/http";
import { Injectable } from '@angular/core';
import {AppConfigServiceService} from "./app-config-service.service";

@Injectable({
  providedIn: 'root'
})
export class GetWarehouseAlphaService {
  constructor(private http: HttpClient,  private appConfigService: AppConfigServiceService ) {}

  getWarehouses(alphaId : any){
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    //set the http options
    const options = {
      headers: headers
    };

    const getAllWarehousesURL = this.appConfigService.getWarehouseURL() + this.appConfigService.getWarehouseByAlphaId();


    //return the http get request and fill the array with the data
    return this.http.get<any>(getAllWarehousesURL + alphaId, options).toPromise();

  }
}
