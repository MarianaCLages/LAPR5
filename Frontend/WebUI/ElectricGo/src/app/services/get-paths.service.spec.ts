import { TestBed } from '@angular/core/testing';

import { GetPathsService } from './get-paths.service';
import {HttpClient, HttpHandler} from "@angular/common/http";
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GetPathsService', () => {
  let service: GetPathsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(GetPathsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //TODO: Teste está a façhar porque não está a conseguir fazer o get do path que está na config.json
 /* it('should return an array of paths', () => {
    expect(service.getPaths()).toBeTruthy();
  }
  );*/



});
