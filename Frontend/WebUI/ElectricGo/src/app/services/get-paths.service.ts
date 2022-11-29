import {AppConfigServiceService} from './app-config-service.service';
import {HttpClient} from '@angular/common/http';
import IPathDTO from '../shared/pathDTO';
import {Injectable} from '@angular/core';

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

  getPaths(): any {
    //set the http headers
    const headers = {};

    //set the http options
    const options = {
      headers: headers
    };
    this.path = this.appConfigService.getLogisticsURL() + this.appConfigService.getPathURL();
    return this.http.get<IPathDTO[]>(this.path, options).toPromise();
  }
}
