import { TestBed } from '@angular/core/testing';

import { GetWarehouseServiceService } from './get-warehouse-service.service';
import {HttpClient, HttpHandler} from "@angular/common/http";
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GetWarehouseServiceService', () => {
  let service: GetWarehouseServiceService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(GetWarehouseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
