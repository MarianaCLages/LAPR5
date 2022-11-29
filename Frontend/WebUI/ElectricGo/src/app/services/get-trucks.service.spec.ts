import { TestBed } from '@angular/core/testing';

import { GetTrucksService } from './get-trucks.service';

describe('GetTrucksService', () => {
  let service: GetTrucksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTrucksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
