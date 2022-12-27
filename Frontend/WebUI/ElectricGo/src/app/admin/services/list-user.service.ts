import {Injectable} from "@angular/core";
import {HttpClient, HttpResponse} from "@angular/common/http";
import {ITruckDTO} from "../../shared/truckDTO";
import {ICreateUserDTO} from "../../shared/createUserDTO";


@Injectable({
  providedIn: 'root',
})

export class ListUserService{

  url = 'http://localhost:5000/api/User';


  constructor(private http: HttpClient) {}

  listUser(){
    return this.http.get<HttpResponse<any>>(this.url).toPromise();
  }

  desactivateUser(email: string) : any {
    //set the http headers
    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',

    };

    //set the http options
    const options = {
      headers: headers,
    };

    //get the trucks from the backend



    let deleteURL = 'http://localhost:5000/api/User/byEmailDelete?email=' + email;
    return this.http.delete<ICreateUserDTO>(deleteURL,options).toPromise();
  }


}
