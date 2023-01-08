import { TestBed } from '@angular/core/testing';

import { ListTripsService } from './list-trips.service';

describe('ListTripsService', () => {
  let service: ListTripsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListTripsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
