import { HttpClient } from '@angular/common/http';
import {ICreateWarehouseDTO} from "../shared/createWarehouseDTO";
import { Injectable } from '@angular/core';
import IPathDTO from "../shared/pathDTO";

@Injectable({
  providedIn: 'root'
})
export class GetAllWarehouseService {

  baseURL = "http://localhost:5000/api/Warehouse";
  designationURL = "http://localhost:5000/api/Warehouse/designation?designation=";

  constructor(private http: HttpClient) {

  }

  async getAllWarehouse(): Promise<any>{


    const data = await fetch(this.baseURL,{
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
    })

    const result = (await data.json());

   return result;
  }

  getPathsByEndingWarehouse(designation: any): any {
    //set the http headers
    const headers = {};

    //set the http options
    const options = {
      headers: headers
    };

    return this.http.get<IPathDTO[]>(this.designationURL + designation, options).toPromise();
  }


}
