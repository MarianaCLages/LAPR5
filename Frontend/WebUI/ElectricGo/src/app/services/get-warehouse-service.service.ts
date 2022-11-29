import {HttpClient} from "@angular/common/http";
import {ICreateWarehouseDTO} from "../shared/createWarehouseDTO";
import {Injectable} from '@angular/core';
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GetWarehouseServiceService {

  constructor(
    private http: HttpClient
  ) {
  }

  getWarehouses(): any {
    //set the http headers
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
    };

    //set the http options
    const options = {
      headers: headers
    };


    //return the http get request and fill the array with the data
    return this.http.get<ICreateWarehouseDTO[]>("http://localhost:5000/api/Warehouse", options).toPromise();

  }

}
