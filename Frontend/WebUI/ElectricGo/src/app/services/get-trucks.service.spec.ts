import { TestBed } from '@angular/core/testing';

import { GetTrucksService } from './get-trucks.service';
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('GetTrucksService', () => {
  let service: GetTrucksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetTrucksService, HttpClient, HttpHandler]
    });
    service = TestBed.inject(GetTrucksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
