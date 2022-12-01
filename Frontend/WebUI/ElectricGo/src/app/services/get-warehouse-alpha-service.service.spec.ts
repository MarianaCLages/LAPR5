import { TestBed } from '@angular/core/testing';

import {HttpClient, HttpHandler} from "@angular/common/http";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {GetWarehouseAlphaService} from "./get-warehouse-alpha-service.service";

describe('GetWarehouseAlphaService', () => {
  let service: GetWarehouseAlphaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(GetWarehouseAlphaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
