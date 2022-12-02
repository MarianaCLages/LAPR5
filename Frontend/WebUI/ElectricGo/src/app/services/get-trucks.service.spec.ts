import {TestBed} from '@angular/core/testing';

import {GetTrucksService} from './get-trucks.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('GetTrucksService', () => {
  let service: GetTrucksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(GetTrucksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  /*it('should return an array of trucks', () => {
    expect(service.getTrucks()).toBeTruthy();
  });*/
});
