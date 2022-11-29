import { TestBed } from '@angular/core/testing';

import { AddPackagingService } from './add-packaging.service';
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('AddPackagingService', () => {
  let service: AddPackagingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AddPackagingService, HttpClient, HttpHandler]
    });
    service = TestBed.inject(AddPackagingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
