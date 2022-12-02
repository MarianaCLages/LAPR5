import { HttpClient } from '@angular/common/http';
import { IPackagingDTO } from 'src/app/shared/packagingDTO';
import { Injectable } from '@angular/core';
import { AppConfigServiceService } from 'src/app/services/app-config-service.service';

@Injectable({
  providedIn: 'root'
})
export class ListPackagingService {

  private packaging: any;
  private packagingByParamURL: any;
  private baseURL = this.appConfigService.getLogisticsURL() + this.appConfigService.getPackagingByParamURL();

  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigServiceService
    ) {
    
   }

    getPackaging(): any {
      const headers = {
      };
      const options = {
        headers: headers
      };

      this.packaging = this.appConfigService.getLogisticsURL() + this.appConfigService.getPackagingURL();
      return this.http.get<IPackagingDTO>(this.packaging, options).toPromise();

  }

  getPackagingByTruck(truckRef: string): any {
    const headers = {
    };
    const options = {
      headers: headers
    };

    this.packagingByParamURL = this.appConfigService.getLogisticsURL() + this.appConfigService.getPackagingByParamURL() + "/truck/" + truckRef;
    console.log(this.packagingByParamURL);
    return this.http.get<IPackagingDTO>(this.packagingByParamURL, options).toPromise();
  }
  
  getPackagingByOrder(orderRef: string): any {
    const headers = {
    };
    const options = {
      headers: headers
    };

    this.packagingByParamURL = this.appConfigService.getLogisticsURL() + this.appConfigService.getPackagingByParamURL() + "/order/"+ orderRef;

    console.log(this.packagingByParamURL);
    console.log(orderRef)
    return this.http.get<IPackagingDTO>(this.packagingByParamURL, options).toPromise();
  }

}
