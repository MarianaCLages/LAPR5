import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ITruckDTO } from 'src/app/shared/truckDTO';

@Injectable({
  providedIn: 'root'
})
export class AddTruckService {

  constructor(private http: HttpClient) { }

  addTruck(truck: ITruckDTO) {
    console.log(truck);
    let errorOrSuccess = this.http.post('http://localhost:3000/api/trucks', truck).subscribe(
      (data) => {
        console.log(data);
        return data;
      }
    )
    console.log(errorOrSuccess);
    return errorOrSuccess;
  }
}
