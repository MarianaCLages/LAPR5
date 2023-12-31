import { AppConfigServiceService } from './app-config-service.service';
import { HttpClient } from '@angular/common/http';
import IPathDTO from '../shared/pathDTO';
import { Injectable } from '@angular/core';
import { GoogleApiCommunicationService } from './google-api-communication.service';

@Injectable({
  providedIn: 'root'
})
export class GetPathsService {

  private path: any;

  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigServiceService,
    private google: GoogleApiCommunicationService,
  ) {
  }
  getPathsByBeginningAndEndingWarehouse(benWare: any, endWare: any): any {
    //set the http headers
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'authorization' : "Bearer "+ this.google.getJWT(),
    };

    //set the http options
    const options = {
      headers: headers
    };
    this.path = this.appConfigService.getLogisticsURL() + this.appConfigService.getPathURL() + "/warehouseBeginningAndEnding/" + benWare + "/" + endWare;
    return this.http.get<IPathDTO[]>(this.path, options).toPromise();
  }
  getPathsByEndingWarehouse(endWare: any): any {
    //set the http headers
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'authorization' : "Bearer "+ this.google.getJWT(),
    };

    //set the http options
    const options = {
      headers: headers
    };
    this.path = this.appConfigService.getLogisticsURL() + this.appConfigService.getPathURL() + "/warehouseEnding/" + endWare;
    return this.http.get<IPathDTO[]>(this.path, options).toPromise();
  }
  getPathsByBeginningWarehouse(benWare: any): any {
    //set the http headers
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'authorization' : "Bearer "+ this.google.getJWT(),
    };

    //set the http options
    const options = {
      headers: headers
    };
    this.path = this.appConfigService.getLogisticsURL() + this.appConfigService.getPathURL() + "/warehouseBeginning/" + benWare;
    return this.http.get<IPathDTO[]>(this.path, options).toPromise();
  }

  getPaths(): any {
    //set the http headers
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'authorization' : "Bearer "+ this.google.getJWT(),
    };

    //set the http options
    const options = {
      headers: headers
    };
    this.path = this.appConfigService.getLogisticsURL() + this.appConfigService.getPathURL() + "/" + "allPaths";
    return this.http.get<IPathDTO[]>(this.path, options).toPromise();
  }
}
