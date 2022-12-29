import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {ITruckDTO} from "../../shared/truckDTO";
import {ICreateUserDTO} from "../../shared/createUserDTO";


@Injectable({
  providedIn: 'root',
})



export class ChangeUserRoleService{

  getUrl = 'http://localhost:5000/api/User/byEmail?email=';
  changeUrl = 'http://localhost:5000/api/User/changeByEmail?email='

  constructor(private http: HttpClient) {}


  checkUser(email : string){
    return this.http.get<HttpResponse<any>>(this.getUrl + email);
  }

  changeUser(email : string,registerUser : ICreateUserDTO){
    return this.http.put<HttpResponse<any>>(this.changeUrl + email, registerUser);
  }

}
