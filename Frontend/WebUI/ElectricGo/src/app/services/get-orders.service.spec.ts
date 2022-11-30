import { TestBed } from '@angular/core/testing';

import { GetOrdersService } from './get-orders.service';
import {HttpClient, HttpHandler} from "@angular/common/http";
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('GetOrdersService', () => {
  let service: GetOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(GetOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an array of orders', () => {
    expect(service.getOrders()).toBeTruthy();
  });
});
