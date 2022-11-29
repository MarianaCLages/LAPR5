import { TestBed } from '@angular/core/testing';

import { CreatePathServiceService } from './create-path-service.service';
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('CreatePathServiceService', () => {
  let service: CreatePathServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreatePathServiceService, HttpClient, HttpHandler]
    });
    service = TestBed.inject(CreatePathServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
