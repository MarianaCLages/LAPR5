import { TestBed } from '@angular/core/testing';

import { GetWarehouseServiceService } from './get-warehouse-service.service';
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('GetWarehouseServiceService', () => {
  let service: GetWarehouseServiceService;

  beforeEach(() => {

    TestBed.configureTestingModule({
      providers: [GetWarehouseServiceService,HttpClient, HttpHandler]
    });
    service = TestBed.inject(GetWarehouseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
