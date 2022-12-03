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
  warehouseURL = 'http://localhost:5000/api/Warehouse'

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
    console.log(result);
    let warehouseIDs = result.split(',');

    console.log(warehouseIDs);
    const data2 = await fetch(this.warehouseURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const result2 = (await data2.json());
    let warehouseArray = [];
    let id;

    console.log(result2);
    for(let j = 0; j < warehouseIDs.length; j++){

      for(let i = 0; i < result2.length; i++){

        id = + result2[i].alphaNumId.substring(1);
        console.log(id);
        if(id == + warehouseIDs[j]){
          console.log('OLA');
          warehouseArray.push(result2[i]);
        }

      }

    }

    console.log(warehouseArray);
    return warehouseArray;

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
    console.log(result);
    let warehouseIDs = result.split(',');

    console.log(warehouseIDs);
    const data2 = await fetch(this.warehouseURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const result2 = (await data2.json());
    let warehouseArray = [];
    let id;

    console.log(result2);
    for(let j = 0; j < warehouseIDs.length; j++){

      for(let i = 0; i < result2.length; i++){

        id = + result2[i].alphaNumId.substring(1);
        console.log(id);
        if(id == + warehouseIDs[j]){
          console.log('OLA');
          warehouseArray.push(result2[i]);
        }

      }

    }

    console.log(warehouseArray);
    return warehouseArray;

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
    console.log(result);
    let warehouseIDs = result.split(',');

    console.log(warehouseIDs);
    const data2 = await fetch(this.warehouseURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const result2 = (await data2.json());
    let warehouseArray = [];
    let id;

    console.log(result2);
    for(let j = 0; j < warehouseIDs.length; j++){

      for(let i = 0; i < result2.length; i++){

        id = + result2[i].alphaNumId.substring(1);
        console.log(id);
        if(id == + warehouseIDs[j]){
          console.log('OLA');
          warehouseArray.push(result2[i]);
        }

      }

    }

    console.log(warehouseArray);
    return warehouseArray;

  }
}
