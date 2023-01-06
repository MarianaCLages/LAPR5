import {HttpClient, HttpResponse} from "@angular/common/http";
import {AppConfigServiceService} from "../../services/app-config-service.service";
import {GoogleApiCommunicationService} from "../../services/google-api-communication.service";
import {Injectable} from "@angular/core";
import {ICreateTripDTO} from "../../shared/ICreateTripDTO";


@Injectable({
  providedIn: 'root'
})
export class BestPathForFleetService{

  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigServiceService,
    private google: GoogleApiCommunicationService
  ) {

  }



  public async bestPathForFleetService(date : any){

    let baseUrl = 'http://localhost:3000/api/trucks/get_best_path/';
    let dateArray = date.split('-');
    let sendDate = dateArray[2] + '_' + dateArray[1] + '_' + dateArray[0];

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'authorization' : "Bearer "+ this.google.getJWT(),
    };

    const options = {
      headers: headers
    };

    console.log(sendDate);
    console.log(baseUrl+sendDate);
    return this.http.get<HttpResponse<ICreateTripDTO>>(baseUrl + sendDate,options).toPromise();
  }


}
