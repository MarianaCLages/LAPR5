import { HttpClient } from "@angular/common/http";
import { ICreateWarehouseDTO } from "../shared/createWarehouseDTO";
import { Injectable } from '@angular/core';
import { firstValueFrom } from "rxjs";

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

    //create an IWarehouseDTO array
    let warehouses: ICreateWarehouseDTO[] = [];

    //return the http get request and fill the array with the data
    firstValueFrom(this.http.get<ICreateWarehouseDTO[]>("http://localhost:5000/api/Warehouse", options)).then(res => {
      for (let i = 0; i < res.length; i++) {
        warehouses.push(res[i]);
      }
    });
    //return the array
    return warehouses;
  }

}
