import { TestBed } from '@angular/core/testing';

import { CreatePathServiceService } from './create-path-service.service';

describe('CreatePathServiceService', () => {
  let service: CreatePathServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatePathServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
