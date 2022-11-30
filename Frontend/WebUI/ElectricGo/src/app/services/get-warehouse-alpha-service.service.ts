import { HttpClient } from "@angular/common/http";
import { ICreateWarehouseDTO } from "../shared/createWarehouseDTO";
import { Injectable } from '@angular/core';
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GetWarehouseAlphaService {

  baseURL= 'http://localhost:5000/api/Warehouse';

  constructor(
    private http: HttpClient
  ) {
  }

  public async getWarehouses(alphaId : any): Promise<any> {



    const data = await fetch(this.baseURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const result = (await data.json());
    var warehouse = [];

    console.log(result);
    for(let i = 0; i < result.length; i++){


      if(result[i].alphaNumId == alphaId){
        warehouse.push(result[i]);
      }
    }

    console.log(warehouse[0]);

    return warehouse;
  }
}
