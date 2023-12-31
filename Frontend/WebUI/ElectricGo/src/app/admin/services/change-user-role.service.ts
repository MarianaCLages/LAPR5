import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {ICreateUserDTO} from "../../shared/createUserDTO";
import { AppConfigServiceService } from "src/app/services/app-config-service.service";
import { GoogleApiCommunicationService } from "src/app/services/google-api-communication.service";


@Injectable({
  providedIn: 'root',
})



export class ChangeUserRoleService{
  constructor(private http: HttpClient,
    private appConfigService: AppConfigServiceService,
    private service: GoogleApiCommunicationService) {}

  checkUser(email : string){
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': this.service.getJWT(),
    };

    const options = {
      headers: headers
    };

    const checkUserPath = this.appConfigService.getWarehouseURL() + this.appConfigService.getUserByEmail();
    return this.http.get<HttpResponse<any>>(checkUserPath + email, options);

  }

  changeUser(email : string,registerUser : ICreateUserDTO){
    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': this.service.getJWT(),
    };

    const options = {
      headers: headers
    };

    const checkUserPath = this.appConfigService.getWarehouseURL() + this.appConfigService.changeUserByEmail();

    return this.http.put<HttpResponse<any>>(checkUserPath + email, registerUser, options);
  }

}
