import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITruckDTO } from 'src/app/shared/truckDTO';

@Injectable({
  providedIn: 'root'
})
export class AddTruckService {

  errorMessage = "";

  constructor(private http: HttpClient) { }

  addTruck(truck: ITruckDTO) {
      return this.http.post('http://localhost:3000/api/trucks', truck);
  }
}
