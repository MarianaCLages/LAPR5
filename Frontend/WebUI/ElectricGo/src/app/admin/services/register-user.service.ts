import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {ICreateUserDTO} from "../../shared/createUserDTO";
import { AppConfigServiceService } from "src/app/services/app-config-service.service";
import { GoogleApiCommunicationService } from "src/app/services/google-api-communication.service";

@Injectable({
  providedIn: 'root',
})

export class RegisterUserService {
  constructor(private http: HttpClient,
    private appConfigService: AppConfigServiceService,
    private service: GoogleApiCommunicationService) {}

  registerUser(registerUser : ICreateUserDTO){

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': this.service.getJWT(),
    };

    const options = {
      headers: headers
    };

    const registerUserURL = this.appConfigService.getWarehouseURL() + this.appConfigService.getAllUsersURL();

    return this.http.post<HttpResponse<any>>(registerUserURL, registerUser, options);
  }
}
