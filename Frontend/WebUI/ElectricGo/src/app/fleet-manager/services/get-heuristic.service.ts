import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AppConfigServiceService} from "../../services/app-config-service.service";

@Injectable({
  providedIn: 'root'
})

export class GetHeuristicService {
  private path: any;
  baseURL= 'http://localhost:3000/api/trucks/send_info/';

  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigServiceService
  ) {
  }

  public async getHeuristics(alphaId: any): Promise<any> {

    const data = await fetch(this.baseURL + alphaId, {
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
}
