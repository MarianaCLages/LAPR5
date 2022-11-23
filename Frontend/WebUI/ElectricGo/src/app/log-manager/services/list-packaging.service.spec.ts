import { TestBed } from '@angular/core/testing';

import { ListPackagingService } from './list-packaging.service';

describe('ListPackagingService', () => {
  let service: ListPackagingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListPackagingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
