import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigServiceService } from './app-config-service.service';
import { GoogleApiCommunicationService } from './google-api-communication.service';

@Injectable({
  providedIn: 'root'
})
export class ListTripsService {

  private trips: any;

  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigServiceService,
    private google: GoogleApiCommunicationService,) {
   }

   getAllTripsDay(date: any): any {
    //set the http headers
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'authorization': this.google.getJWT(),
    };

    //set the http options
    const options = {
      headers: headers
    };
    this.trips = this.appConfigService.getLogisticsURL() + this.appConfigService.getAllTripsInADay();
    return this.http.get(this.trips, options).toPromise();
  }

   getTripsByTruck(truckId: any): any {
    //set the http headers
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'authorization': this.google.getJWT(),
    };

    //set the http options
    const options = {
      headers: headers
    };
    this.trips = this.appConfigService.getLogisticsURL() + this.appConfigService.getTripURL() + "/truck/" + truckId;
    return this.http.get(this.trips, options).toPromise();
  }

}
