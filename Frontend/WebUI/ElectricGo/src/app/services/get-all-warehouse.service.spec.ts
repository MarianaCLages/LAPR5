import { TestBed } from '@angular/core/testing';

import {HttpClient, HttpHandler} from "@angular/common/http";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {GetAllWarehouseService} from "./get-all-warehouse.service";

describe('GetAllWarehouseService', () => {
  let service: GetAllWarehouseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(GetAllWarehouseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
