import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConfigServiceService {
  private appConfig: any;

  constructor(
    private http: HttpClient
  ) {
  }

  loadAppConfig() {
    console.log("loadAppConfig");
    //loads the json file
    return this.http.get<any>('./assets/config.json').toPromise()
      .then(data => {
        this.appConfig = data;
      });
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



  // Packaging
  getPackagingURL() {
    return this.appConfig.getPackagingPath;
  }

  getPackagingByParamURL() {
    return this.appConfig.getPackagingByParamPath;
  }

  getTruckByParamURL() {
    return this.appConfig.getTruckByParamPath;
  }

  getAllTrucksURL() {
    return this.appConfig.getAllTrucks;
  }


  // Orders
  getOrderByParamURL() {
    return this.appConfig.getOrderByParamPath;
  }

  getAllOrdersURL() {
    return this.appConfig.getAllOrdersPath;
  }



}
