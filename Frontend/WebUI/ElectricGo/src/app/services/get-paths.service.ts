import { HttpClient } from '@angular/common/http';
import IPathDTO from '../shared/pathDTO';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GetPathsService {

  constructor(
    private http: HttpClient
  ) { }

  getPaths() {
    //set the http headers
    const headers = {
    };

    //set the http options
    const options = {
      headers: headers
    };

    //create an IPatDTO array
    let paths;

    //get the paths from the backend
    return this.http.get<IPathDTO>('http://localhost:3000/api/paths/allPaths', options);


  }
}
