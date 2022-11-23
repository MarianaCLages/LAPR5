import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListPackagingService {

  constructor(private http: HttpClient) {
    
   }

    getPackaging(): any {
      let packaging = this.http.get('http://localhost:3000/api/packaging').subscribe(
        (data) => {
          return data;
        }
      )
    }
}
