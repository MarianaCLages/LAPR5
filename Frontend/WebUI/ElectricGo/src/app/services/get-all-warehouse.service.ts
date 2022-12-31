import { HttpClient } from '@angular/common/http';
import {ActivatedWarehouseDTO} from "../shared/ActivatedWarehouseDTO";
import { Injectable } from '@angular/core';
import { AppConfigServiceService } from './app-config-service.service';

@Injectable({
  providedIn: 'root'
})
export class GetAllWarehouseService {
  constructor(private http: HttpClient,  private appConfigService: AppConfigServiceService,) {}

  async getAllWarehouse(): Promise<any>{
    const getAllWarehouseURL = this.appConfigService.getWarehouseURL() + this.appConfigService.getAllWarehouses();

    const data = await fetch(getAllWarehouseURL,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
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
    };

    //set the http options
    const options = {
      headers: headers
    };

    const getPathsByEndindWarehouseURL = this.appConfigService.getWarehouseURL() + this.appConfigService.getPathsWByEndingW();

    return this.http.get<ActivatedWarehouseDTO[]>(getPathsByEndindWarehouseURL + designation, options).toPromise();
  }


}
