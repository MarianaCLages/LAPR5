import { TestBed } from '@angular/core/testing';

import { ListPackagingService } from './list-packaging.service';
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('ListPackagingService', () => {
  let service: ListPackagingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListPackagingService, HttpClient,HttpHandler]
    });
    service = TestBed.inject(ListPackagingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an array of packaging', () => {
    expect(service.getPackaging()).toBeTruthy();
  });
});
