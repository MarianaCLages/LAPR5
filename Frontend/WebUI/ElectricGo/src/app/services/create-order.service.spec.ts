import { TestBed } from '@angular/core/testing';

import { CreateOrderService } from './create-order.service';
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('AddOrderService', () => {
  let service: CreateOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateOrderService, HttpClient, HttpHandler]
    });
    service = TestBed.inject(CreateOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
