import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppConfigServiceService } from 'src/app/services/app-config-service.service';
import { ITruckDTO } from 'src/app/shared/truckDTO';

@Injectable({
  providedIn: 'root'
})
export class AddTruckService {

  constructor(private http: HttpClient,
    private appConfigService: AppConfigServiceService) { }

  addTruck(truck: ITruckDTO) {
     //set the http headers
     const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    //set the http options
    const options = {
      headers: headers
    };

    const createPackagePath = this.appConfigService.getLogisticsURL() + this.appConfigService.getTruckByParamURL();

    return this.http.post(createPackagePath, truck, options);
  }
}
