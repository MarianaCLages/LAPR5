import { TestBed } from '@angular/core/testing';

import { AddTruckService } from './add-truck.service';

describe('AddTruckService', () => {
  let service: AddTruckService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddTruckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
