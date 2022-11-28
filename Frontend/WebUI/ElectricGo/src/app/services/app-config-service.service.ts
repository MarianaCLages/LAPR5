import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConfigServiceService {
  private appConfig: any;

  constructor(
    private http: HttpClient
  ) { }

  loadAppConfig() {
    //loads the json file
    return this.http.get('../assets/config.json').toPromise().then(data => {
        this.appConfig = data;
      }
      );
  }

  getWarehouseURL() {
    return this.appConfig.warehouseURI;
  }


  getLogisticsURL() {
    return this.appConfig.logisticsURI;
  }

  getPathURL() {
    return this.appConfig.getPathPath;
  }
}
