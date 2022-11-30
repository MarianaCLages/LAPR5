import { TestBed } from '@angular/core/testing';

import { AddPackagingService } from './add-packaging.service';
import {HttpClient, HttpHandler} from "@angular/common/http";
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddPackagingService', () => {
  let service: AddPackagingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AddPackagingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
