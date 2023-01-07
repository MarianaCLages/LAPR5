import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {ICreateUserDTO} from "../../shared/createUserDTO";
import { AppConfigServiceService } from "src/app/services/app-config-service.service";
import { GoogleApiCommunicationService } from "src/app/services/google-api-communication.service";


@Injectable({
  providedIn: 'root',
})

export class ListUserService{

  constructor(private http: HttpClient,
    private appConfigService: AppConfigServiceService,
    private service: GoogleApiCommunicationService) {}

  listUser(){
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': this.service.getJWT(),
    };

    const options = {
      headers: headers
    };

    const getAllUsersURL = this.appConfigService.getWarehouseURL() + this.appConfigService.getAllUsersURL();
    return this.http.get<HttpResponse<any>>(getAllUsersURL, options).toPromise();
  }

  desactivateUser(email: string) {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': this.service.getJWT(),
    };

    const options = {
      headers: headers
    };

    const softDeletePath = this.appConfigService.getWarehouseURL() + this.appConfigService.softDeleteUserByEmail();

    return this.http.patch<HttpResponse<any>>(softDeletePath + email ,options).toPromise();
  }

  anonymize(email: string) {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': this.service.getJWT(),
    };

    const options = {
      headers: headers
    };

    const softDeletePath = this.appConfigService.getWarehouseURL() + this.appConfigService.anonimyzeUserByEmail();

    return this.http.patch<HttpResponse<any>>(softDeletePath + email ,options).toPromise();
  }



}
