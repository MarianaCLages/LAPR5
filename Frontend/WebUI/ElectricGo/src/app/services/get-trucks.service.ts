import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {ITruckDTO} from '../shared/truckDTO';

@Injectable({
  providedIn: 'root'
})
export class GetTrucksService {
  constructor(private http: HttpClient) {}

  getTrucks() : any {
    //set the http headers
    const headers = {};

    //set the http options
    const options = {
      headers: headers,
    };

    //create an IPatDTO array
    let trucks;

    //get the trucks from the backend
    return this.http.get<ITruckDTO>('http://localhost:3000/api/trucks/all', options).toPromise();
  }
}
