import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {ICreateUserDTO} from "../../shared/createUserDTO";
import { AppConfigServiceService } from "src/app/services/app-config-service.service";


@Injectable({
  providedIn: 'root',
})

export class ListUserService{

  constructor(private http: HttpClient,
    private appConfigService: AppConfigServiceService) {}

  listUser(){
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const options = {
      headers: headers
    };

    const getAllUsersURL = this.appConfigService.getWarehouseURL() + this.appConfigService.getAllUsersURL();
    return this.http.get<HttpResponse<any>>(getAllUsersURL, options).toPromise();
  }

  desactivateUser(email: string) : any {
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    };

    const options = {
      headers: headers
    };

    const softDeletePath = this.appConfigService.getWarehouseURL() + this.appConfigService.softDeleteUserByEmail();

    return this.http.delete<ICreateUserDTO>(softDeletePath + email ,options);
  }


}
