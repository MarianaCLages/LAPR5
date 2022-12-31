import {HttpClient} from "@angular/common/http";
import {ICreateWarehouseDTO} from "../shared/createWarehouseDTO";
import {Injectable} from '@angular/core';
import {firstValueFrom} from "rxjs";
import { AppConfigServiceService } from "./app-config-service.service";

@Injectable({
  providedIn: 'root'
})
export class GetWarehouseServiceService {

  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigServiceService
  ) {
  }

  getWarehouses(): any {
    //set the http headers
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    //set the http options
    const options = {
      headers: headers
    };

    const allWarehousesURL = this.appConfigService.getWarehouseURL() + this.appConfigService.getAllWarehouses();

    //return the http get request and fill the array with the data
    return this.http.get<ICreateWarehouseDTO[]>(allWarehousesURL, options).toPromise();

  }

}
