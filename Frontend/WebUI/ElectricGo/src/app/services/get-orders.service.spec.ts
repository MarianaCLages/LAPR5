import { TestBed } from '@angular/core/testing';

import { GetOrdersService } from './get-orders.service';

describe('GetOrdersService', () => {
  let service: GetOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an array of orders', () => {
    expect(service.getOrders()).toBeTruthy();
  });
});
