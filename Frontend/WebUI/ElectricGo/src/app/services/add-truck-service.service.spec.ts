import { TestBed } from '@angular/core/testing';

import { AddTruckServiceService } from './add-truck-service.service';

describe('AddTruckServiceService', () => {
  let service: AddTruckServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddTruckServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
