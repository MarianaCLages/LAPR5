import { HttpClient } from '@angular/common/http';
import { IPackagingDTO } from 'src/app/shared/packagingDTO';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ListPackagingService {

  constructor(
    private http: HttpClient
    ) {
    
   }

    getPackaging() {
      const headers = {
      };
      const options = {
        headers: headers
      };

      let packagings;

      return this.http.get('http://localhost:3000/api/packaging/all', options);
    }



}
