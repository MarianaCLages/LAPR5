import { AppConfigServiceService } from './app-config-service.service';
import { HttpClient } from '@angular/common/http';
import IPathDTO from '../shared/pathDTO';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetPathsService {

  private path: any;

  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigServiceService
  ) {
  }
  getPathsByBeginningAndEndingWarehouse(benWare: any, endWare: any): any {
    //set the http headers
    const headers = {};

    //set the http options
    const options = {
      headers: headers
    };
    this.path = this.appConfigService.getLogisticsURL() + this.appConfigService.getPathURL() + "/warehouseBeginningAndEnding/" + benWare + "/" + endWare;
    return this.http.get<IPathDTO[]>(this.path, options).toPromise();
  }
  getPathsByEndingWarehouse(endWare: any): any {
    //set the http headers
    const headers = {};

    //set the http options
    const options = {
      headers: headers
    };
    this.path = this.appConfigService.getLogisticsURL() + this.appConfigService.getPathURL() + "/warehouseEnding/" + endWare;
    return this.http.get<IPathDTO[]>(this.path, options).toPromise();
  }
  getPathsByBeginningWarehouse(benWare: any): any {
    //set the http headers
    const headers = {};

    //set the http options
    const options = {
      headers: headers
    };
    this.path = this.appConfigService.getLogisticsURL() + this.appConfigService.getPathURL() + "/warehouseBeginning/" + benWare;
    return this.http.get<IPathDTO[]>(this.path, options).toPromise();
  }

  getPaths(): any {
    //set the http headers
    const headers = {};

    //set the http options
    const options = {
      headers: headers
    };
    this.path = this.appConfigService.getLogisticsURL() + this.appConfigService.getPathURL() + "/" + "allPaths";
    return this.http.get<IPathDTO[]>(this.path, options).toPromise();
  }
}
