import { AppConfigServiceService } from 'src/app/services/app-config-service.service';
import { HttpClient } from '@angular/common/http';
import {ITruckDTO} from '../shared/truckDTO';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetTrucksService {
  constructor(private http: HttpClient, private appConfigService: AppConfigServiceService) {}

  private truckAllURL : any;
  private truckParamURL : any;

  getTrucks() : any {
    //set the http headers
    const headers = {};

    //set the http options
    const options = {
      headers: headers,
    };

    //get the trucks from the backend
    this.truckAllURL = this.appConfigService.getLogisticsURL() + this.appConfigService.getAllTrucksURL();
    
    return this.http.get<ITruckDTO>(this.truckAllURL, options).toPromise();
  }

  getTrucksByPlate(plate: string) : any {
    //set the http headers
    const headers = {};

    //set the http options
    const options = {
      headers: headers,
    };

    //get the trucks from the backend
    this.truckParamURL = this.appConfigService.getLogisticsURL() + this.appConfigService.getTruckByParamURL() + "/plate/" + plate;
    return this.http.get<ITruckDTO>(this.truckParamURL, options).toPromise();
  }

  getTrucksByCaract(caract: string) : any {
    //set the http headers
    const headers = {};

    //set the http options
    const options = {
      headers: headers,
    };

    //get the trucks from the backend
    this.truckParamURL = this.appConfigService.getLogisticsURL() + this.appConfigService.getTruckByParamURL() + "/caract/" + caract;

    return this.http.get<ITruckDTO>(this.truckParamURL, options).toPromise();
  }



}
