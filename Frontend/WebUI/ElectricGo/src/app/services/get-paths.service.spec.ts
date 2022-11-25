import { TestBed } from '@angular/core/testing';

import { GetPathsService } from './get-paths.service';

describe('GetPathsService', () => {
  let service: GetPathsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetPathsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an array of paths', () => {
    expect(service.getPaths()).toBeTruthy();
  }
  );



});
