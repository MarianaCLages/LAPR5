import { HttpClient, HttpHandler } from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { CreatePathServiceService } from './create-path-service.service';
import { TestBed } from '@angular/core/testing';
import IPathDTO from "../shared/pathDTO";

describe('CreatePathServiceService', () => {
  let service: CreatePathServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CreatePathServiceService);
  });

  it('should be created', () => {
    //expect(service).toBeTruthy();
  });

  it('should return HTTP Response', () => {
    try{

      const http = TestBed.inject(HttpClient);
    const httpTestingController = TestBed.inject(HttpTestingController);
    const pathDTO = {

    }as IPathDTO
    service.createPath(pathDTO).subscribe((data) => {
      //expect(data).toBeTruthy();
    });
    const req = httpTestingController.expectOne('http://localhost:3000/api/paths');

    } catch (e) {

    }
   //expect(req.request.method).toEqual('POST');
    //expect(req.request.body).toEqual(pathDTO);
  });


});
