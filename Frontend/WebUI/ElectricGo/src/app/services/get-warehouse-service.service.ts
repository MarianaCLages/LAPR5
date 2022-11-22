import {Injectable} from '@angular/core';
import IPathDTO from "../shared/pathDTO";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GetWarehouseServiceService {

  constructor(
    private http: HttpClient
  ) {
  }

  getWarehouses(): any {
    let warehouses = this.http.get('http://localhost:5000/api/warehouses').subscribe(
      (data) => {
        return data;
      }
    )
  }
}
