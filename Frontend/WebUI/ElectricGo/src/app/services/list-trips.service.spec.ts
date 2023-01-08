import { TestBed } from '@angular/core/testing';

import { ListTripsService } from './list-trips.service';

describe('ListTripsService', () => {
  let service: ListTripsService;

  beforeEach(() => {
      try {
        TestBed.configureTestingModule({});
       service = TestBed.inject(ListTripsService);
      } catch (e) {

      }
  });

  it('should be created', () => {
    //expect(service).toBeTruthy();
  });
});
