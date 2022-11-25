import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListPackagingService {

  constructor(private http: HttpClient) {
    
   }

    getPackaging(): any {
      let packaging = this.http.get('http://localhost:3000/api/packagings/all').subscribe(
        (data) => {
          return data;
        }
      )
    }

    getPackagingByTruck(): any {
      let packaging = this.http.get('http://localhost:3000/api/packagings/truck').subscribe(
        (data) => {
          return data;
        }
      )
    }

    getPackagingByOrder(): any {
      let packaging = this.http.get('http://localhost:3000/api/packagings/order').subscribe(
        (data) => {
          return data;
        }
      )
    }

}
