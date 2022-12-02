import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AppConfigServiceService} from "../../services/app-config-service.service";

@Injectable({
  providedIn: 'root'
})

export class GetHeuristicService {
  private path: any;
  baseURL= 'http://localhost:3000/api/trucks/send_info/';
  baseURLWeight = 'http://localhost:3000/api/trucks/get_heuristic_weight/';
  baseURLWeightTime = 'http://localhost:3000/api/trucks/get_heuristic_weight_time/';

  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigServiceService
  ) {
  }

  public async getHeuristics(alphaId: any, date: any): Promise<any> {

    let dateArray = date.split('/');
    let sendDate = dateArray[0] + '_' + dateArray[1] + '_' + dateArray[2];

    const data = await fetch(this.baseURL + alphaId + '/' + sendDate, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const result = (await data.json());
    console.log(result)
    return result;

  }

  public async getHeuristicByWeight(alphaId: any,date: any):Promise<any>{

    let dateArray = date.split('/');
    let sendDate = dateArray[0] + '_' + dateArray[1] + '_' + dateArray[2];

    const  data = await fetch(this.baseURLWeight + alphaId + '/' + sendDate, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
    })

    const result = (await data.json());
    console.log(result)
    return result;
  }

  public async getHeuristicByWeightTime(alphaId: any,date: any):Promise<any>{

    let dateArray = date.split('/');
    let sendDate = dateArray[0] + '_' + dateArray[1] + '_' + dateArray[2];

    const  data = await fetch(this.baseURLWeightTime + alphaId + '/' + sendDate, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      }
    })

    const result = (await data.json());
    console.log(result)
    return result;
  }
}
