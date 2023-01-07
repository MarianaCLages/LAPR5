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
    //loads the json file
    return this.http.get<any>('./assets/config.json').toPromise()
      .then(data => {
        this.appConfig = data;
      });
  }

  // Warehouse API base URL

  getWarehouseURL() {
    return this.appConfig.warehouseURI;
  }

  // Logistics API base URL

  getLogisticsURL() {
    return this.appConfig.logisticsURI;
  }

  // Warehouses

  getAllWarehouses() {
    return this.appConfig.getAllWarehousesPath;
  }

  getWarehouseByAlphaId() {
    return this.appConfig.getWarehouseByAlphaId;
  }

  getPathsWByEndingW() {
    return this.appConfig.getPathsWByEndingW;
  }

  getDesactivationWarehouse() {
    return this.appConfig.desactivationWarehouse;
  }

  getActivationWarehouse() {
    return this.appConfig.activationWarehouse;
  }

  // Paths

  getPathURL() {
    return this.appConfig.getPathPath;
  }

  // Packagings

  getPackagingURL() {
    return this.appConfig.getPackagingPath;
  }

  getPackagingByParamURL() {
    return this.appConfig.getPackagingByParamPath;
  }

  // Trucks

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

  // Users

  getAllUsersURL() {
    return this.appConfig.getAllUsersPath;
  }

  getUserByEmail() {
    return this.appConfig.getUserByEmailPath;
  }

  getUserByRole() {
    return this.appConfig.getUserByRolePath;
  }

  loginUserWithGoogle() {
    return this.appConfig.loginUserWithGooglePath;
  }

  getNewUserInfo() {
    return this.appConfig.getNewUserInfoPath;
  }

  getUserProfileInfo() {
    return this.appConfig.getUserProfileInfoPath;
  }

  changeUserByEmail() {
    return this.appConfig.changeUserByEmailPath;
  }

  softDeleteUserByEmail() {
    return this.appConfig.softDeleteUserByEmail;
  }

  anonimyzeUserByEmail() {
    return this.appConfig.anonymizeUserByEmail;
  }

  // Heuristics

  getHeuristicBaseURL() {
    return this.appConfig.heuristicBaseURL;
  }

  getHeuristicWeightTime() {
    return this.appConfig.heuristicWeightTimeURL;
  }

  getHeuristicWeight() {
    return this.appConfig.heuristicWeightURL;
  }

  //AG

  getTripByAG(){
    return this.appConfig.getTripByAG;
  }

  //Trips

  getAllTripsInADay() {
    return this.appConfig.getAllTripsInADay;
  }

}
