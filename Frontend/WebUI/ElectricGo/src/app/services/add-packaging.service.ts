import { HttpClient, HttpResponse } from '@angular/common/http';
import { ICreatePackagingDTO } from '../shared/createPackagingDTO';
import { Injectable } from '@angular/core';
import { AppConfigServiceService } from './app-config-service.service';
import { GoogleApiCommunicationService } from './google-api-communication.service';

@Injectable({
  providedIn: 'root',
})
export class AddPackagingService {

  constructor(private http: HttpClient,
     private appConfigService: AppConfigServiceService,
     private service: GoogleApiCommunicationService) {}

  addPackaging(createPackage: ICreatePackagingDTO) {

     //set the http headers
     const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'authorization' : "Bearer "+this.service.getJWT(),
    };

    //set the http options
    const options = {
      headers: headers
    };

    const createPackagePath = this.appConfigService.getLogisticsURL() + this.appConfigService.getPackagingByParamURL();

    return this.http.post<HttpResponse<any>>(createPackagePath, createPackage, options);
  }
}
