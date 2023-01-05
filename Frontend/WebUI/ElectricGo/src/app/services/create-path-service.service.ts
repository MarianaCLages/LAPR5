import { HttpClient, HttpResponse } from "@angular/common/http";

import IPathDTO from "../shared/pathDTO";
import { Injectable } from '@angular/core';
import { AppConfigServiceService } from "./app-config-service.service";
import { GoogleApiCommunicationService } from "./google-api-communication.service";

@Injectable({
  providedIn: 'root'
})
export class CreatePathServiceService {
  constructor(private http: HttpClient,
    private appConfigService: AppConfigServiceService,
    private google: GoogleApiCommunicationService,) {

  }

  createPath(pathDTO: IPathDTO) {
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

    const createPathURL = this.appConfigService.getLogisticsURL() + this.appConfigService.getPathURL();

    return this.http.post<HttpResponse<any>>(createPathURL, pathDTO, options);
  }

}
