import { TestBed } from '@angular/core/testing';

import { CreatePathServiceService } from './create-path-service.service';
import {HttpClient, HttpHandler} from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('CreatePathServiceService', () => {
  let service: CreatePathServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CreatePathServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
