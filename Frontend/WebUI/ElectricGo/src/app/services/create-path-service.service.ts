import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable, catchError, of } from "rxjs";

import IPathDTO from "../shared/pathDTO";
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CreatePathServiceService {
  errorMessage = "";

  constructor(private http: HttpClient) {

  }

  createPath(pathDTO: IPathDTO) {

    return this.http.post<HttpResponse<any>>('http://localhost:3000/api/paths', pathDTO);


  }

}
