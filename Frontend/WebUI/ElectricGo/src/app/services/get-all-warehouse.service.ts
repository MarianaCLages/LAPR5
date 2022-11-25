import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ICreateWarehouseDTO} from "../shared/createWarehouseDTO";

@Injectable({
  providedIn: 'root'
})
export class GetAllWarehouseService {

  baseURL = "http://localhost:5000/api/Warehouse";

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


}
