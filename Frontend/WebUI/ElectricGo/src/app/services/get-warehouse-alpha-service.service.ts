import { HttpClient } from "@angular/common/http";
import { ICreateWarehouseDTO } from "../shared/createWarehouseDTO";
import { Injectable } from '@angular/core';
import { firstValueFrom } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class GetWarehouseAlphaService {

  baseURL= 'http://localhost:5000/api/Warehouse/id?id=';

  constructor(
    private http: HttpClient
  ) {
  }

  public async getWarehouses(alphaId : any): Promise<any> {



    const data = await fetch(this.baseURL + alphaId, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const result = (await data.json());
    var warehouse = [];

    warehouse.push(result);
    return warehouse;
  }
}
