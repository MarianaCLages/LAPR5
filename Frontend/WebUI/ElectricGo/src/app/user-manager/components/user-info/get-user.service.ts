import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {ITruckDTO} from "../../../shared/truckDTO";
import {ICreateUserDTO} from "../../../shared/createUserDTO";


@Injectable({
  providedIn: 'root',
})

export class GetUserService {




  constructor(private http: HttpClient) {
  }

  listUser() {

    let   url = 'http://localhost:5000/api/User/byEmail?email=Marianita@gmail.com';
    return this.http.get<HttpResponse<any>>(url).toPromise();
  }
}
