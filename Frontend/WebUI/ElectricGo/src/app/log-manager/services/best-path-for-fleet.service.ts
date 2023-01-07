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

  public async bestPathForFleetService(tripDTO: ICreateTripDTO): Promise<any>{
    let url = this.appConfigService.getLogisticsURL() + this.appConfigService.getTripByAG();

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'authorization' : "Bearer "+ this.google.getJWT(),
    };

    const options = {
      headers: headers
    };

    return this.http.post<HttpResponse<any>>(url,tripDTO,options).toPromise();
  }

  public async getAllTripsInAGivenDay(date : any){
    let url = this.appConfigService.getLogisticsURL() + this.appConfigService.getAllTripsInADay();

    const headers = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'authorization' : "Bearer "+ this.google.getJWT(),
    };

    const options = {
      headers: headers
    };

    return this.http.get<HttpResponse<ICreateTripDTO>>(url + date,options).toPromise();

  }

}
