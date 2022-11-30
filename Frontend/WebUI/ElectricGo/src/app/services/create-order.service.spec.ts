import { TestBed } from '@angular/core/testing';

import { CreateOrderService } from './create-order.service';
import {HttpClient, HttpHandler} from "@angular/common/http";
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddOrderService', () => {
  let service: CreateOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CreateOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
