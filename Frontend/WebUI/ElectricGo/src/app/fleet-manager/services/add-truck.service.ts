import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITruckDTO } from 'src/app/shared/truckDTO';

@Injectable({
  providedIn: 'root'
})
export class AddTruckService {
  baseUrl = 'http://localhost:3000/api/trucks';

  constructor(private http: HttpClient) { }
  addTruck(truck: ITruckDTO) {
    const headers = { 'content-type': 'application/json' };

    const body = JSON.stringify(truck);
    console.log(body);

    const data = this.http
      .post<ITruckDTO>(this.baseUrl, body, {
        headers: headers,
        observe: 'response',
      });

    return data;
  }
}
