import { HttpClient } from '@angular/common/http';
import { IPackagingDTO } from 'src/app/shared/packagingDTO';
import { Injectable } from '@angular/core';
import { AppConfigServiceService } from 'src/app/services/app-config-service.service';

@Injectable({
  providedIn: 'root'
})
export class ListPackagingService {

  private packaging: any;

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
      return this.http.get<IPackagingDTO[]>(this.packaging, options).toPromise();

  }



}
