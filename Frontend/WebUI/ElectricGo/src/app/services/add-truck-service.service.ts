import {HttpClient} from '@angular/common/http';
import { ITruckDTO } from '../shared/truckDTO';
import {Injectable} from '@angular/core';
import {tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AddTruckServiceService {

  baseUrl = 'http://localhost:3000/api/trucks/all';

  constructor(private http: HttpClient) {
  }

  addTruck(name: string) {

    let truck: ITruckDTO;
    //Array of trucks
    let trucks = this.http.get<ITruckDTO[]>(this.baseUrl);

    trucks.pipe(tap(_ => console.log('fetched trucks')));
    //for each truck in the array logs all the data
    return trucks;
  }
}
