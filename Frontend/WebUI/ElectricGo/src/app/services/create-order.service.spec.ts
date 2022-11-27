import { TestBed } from '@angular/core/testing';

import { AddOrderService } from './create-order.service';

describe('AddOrderService', () => {
  let service: AddOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
