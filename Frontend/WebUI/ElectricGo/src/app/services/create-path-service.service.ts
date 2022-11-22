import {Injectable} from '@angular/core';
import IPathDTO from "../shared/pathDTO";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CreatePathServiceService {

  constructor(private http: HttpClient) {

  }

  createPath(pathDTO: IPathDTO) {
    let errorOrSuccess = this.http.post('http://localhost:3000/api/paths', pathDTO).subscribe(
      (data) => {
        return data;
      }
    )

    return errorOrSuccess;
  }

}
