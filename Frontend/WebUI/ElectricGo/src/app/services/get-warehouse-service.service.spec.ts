import { TestBed } from '@angular/core/testing';

import { GetWarehouseServiceService } from './get-warehouse-service.service';

describe('GetWarehouseServiceService', () => {
  let service: GetWarehouseServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetWarehouseServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
