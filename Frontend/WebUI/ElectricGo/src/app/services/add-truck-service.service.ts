import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AddTruckServiceService {

  constructor(private http: HttpClient) { }

  addTruck(any: string) {
    console.log("add truck" + any);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    //get from www.google.com
    var dados;
    
    try {
      this.http.get('https://localhost:5001/api/order/', { headers: headers }).subscribe(data => {
        dados = data;
        console.log(data);
      });
      console.log(dados);
    } catch (e) {
      console.log(e);
    }
  }

}
