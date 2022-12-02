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
        console.log(this.appConfig);
      });
  }

  getWarehouseURL() {
    return this.appConfig.warehouseURI;
  }


  getLogisticsURL() {
    console.log(this.appConfig.logisticsURI);
    return this.appConfig.logisticsURI;
  }

  getPathURL() {
    return this.appConfig.getPathPath;
  }

  // Packaging
  getPackagingURL() {
    console.log(this.appConfig.getPackagingPath);
    return this.appConfig.getPackagingPath;
  }

  // Trucks
  getTruckByParamURL() {
    console.log(this.appConfig.getTruckByParamPath);
    return this.appConfig.getTruckByParamPath;
  }

  getAllTrucksURL() {
    console.log(this.appConfig.getAllTrucksPath);
    return this.appConfig.getAllTrucks;
  }

  // Orders
  getOrderByParamURL() {
    return this.appConfig.getOrderByParamPath;
  }

  getAllOrdersURL() {
    return this.appConfig.getAllOrders;
  }
}
