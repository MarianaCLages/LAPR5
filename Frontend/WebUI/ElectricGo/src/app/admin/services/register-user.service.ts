import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {ICreateUserDTO} from "../../shared/createUserDTO";


@Injectable({
  providedIn: 'root',
})

export class RegisterUserService {

  url = 'http://localhost:5000/api/User';

  constructor(private http: HttpClient) {}

  registerUser(registerUser : ICreateUserDTO){
    return this.http.post<HttpResponse<any>>(this.url, registerUser);
  }
}
