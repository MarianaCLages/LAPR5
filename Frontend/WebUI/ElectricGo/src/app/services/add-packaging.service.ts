import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { ICreatePackagingDTO } from '../shared/createPackagingDTO';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AddPackagingService {
  baseUrl = 'http://localhost:3000/api/packagings';

  constructor(private http: HttpClient) {}

  addPackaging(createPackage: ICreatePackagingDTO) {
    const headers = { 'content-type': 'application/json' };

    const body = JSON.stringify(createPackage);

    const data = this.http.post<ICreatePackagingDTO>(this.baseUrl, body, {
      headers: headers,
      observe: 'response',
    });

    return data;
  }
}
