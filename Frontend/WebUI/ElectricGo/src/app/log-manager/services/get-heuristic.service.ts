import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AppConfigServiceService} from "../../services/app-config-service.service";

@Injectable({
  providedIn: 'root'
})

export class GetHeuristicService {
  constructor(
    private http: HttpClient,
    private appConfigService: AppConfigServiceService
  ) {
  }

  public async getHeuristics(alphaId: any, date: any): Promise<any> {

    const baseUrl = this.appConfigService.getLogisticsURL() + this.appConfigService.getHeuristicBaseURL();
    const warehouseURL = this.appConfigService.getWarehouseURL() + this.appConfigService.getAllWarehouses();

    let dateArray = date.split('/');
    let sendDate = dateArray[0] + '_' + dateArray[1] + '_' + dateArray[2];

    const data = await fetch(baseUrl + alphaId + '/' + sendDate, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    const result = (await data.json());
    let warehouseIDs = result.split(',');

    const data2 = await fetch(warehouseURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    const result2 = (await data2.json());
    let warehouseArray = [];
    let id;

    for(let j = 0; j < warehouseIDs.length; j++){

      for(let i = 0; i < result2.length; i++){

        id = + result2[i].alphaNumId.substring(1);
        if(id == + warehouseIDs[j]){
          warehouseArray.push(result2[i]);
        }

      }

    }

    return warehouseArray;

  }

  public async getHeuristicByWeight(alphaId: any,date: any):Promise<any>{

    let dateArray = date.split('/');
    let sendDate = dateArray[0] + '_' + dateArray[1] + '_' + dateArray[2];

    const baseURLWeight = this.appConfigService.getLogisticsURL() + this.appConfigService.getHeuristicWeight();
    const warehouseURL = this.appConfigService.getWarehouseURL() + this.appConfigService.getAllWarehouses();

    const  data = await fetch(baseURLWeight + alphaId + '/' + sendDate, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    const result = (await data.json());
    let warehouseIDs = result.split(',');

    const data2 = await fetch(warehouseURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    const result2 = (await data2.json());
    let warehouseArray = [];
    let id;

    for(let j = 0; j < warehouseIDs.length; j++){
      for(let i = 0; i < result2.length; i++){
        id = + result2[i].alphaNumId.substring(1);
        if(id == + warehouseIDs[j]){
          warehouseArray.push(result2[i]);
        }

      }

    }

    return warehouseArray;
  }

  public async getHeuristicByWeightTime(alphaId: any,date: any):Promise<any>{

    let dateArray = date.split('/');
    let sendDate = dateArray[0] + '_' + dateArray[1] + '_' + dateArray[2];

    const heuristicWeightTime = this.appConfigService.getLogisticsURL() + this.appConfigService.getHeuristicWeightTime();
    const warehouseURL = this.appConfigService.getWarehouseURL() + this.appConfigService.getAllWarehouses();


    const  data = await fetch(heuristicWeightTime + alphaId + '/' + sendDate, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })

    const result = (await data.json());
    let warehouseIDs = result.split(',');

    const data2 = await fetch(warehouseURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
    });

    const result2 = (await data2.json());
    let warehouseArray = [];
    let id;

    for(let j = 0; j < warehouseIDs.length; j++){

      for(let i = 0; i < result2.length; i++){
        id = + result2[i].alphaNumId.substring(1);
        if(id == + warehouseIDs[j]){
          warehouseArray.push(result2[i]);
        }

      }

    }

    return warehouseArray;

  }
}
