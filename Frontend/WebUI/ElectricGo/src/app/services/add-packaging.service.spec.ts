import { TestBed } from '@angular/core/testing';

import { AddPackagingService } from './add-packaging.service';

describe('AddPackagingService', () => {
  let service: AddPackagingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddPackagingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
