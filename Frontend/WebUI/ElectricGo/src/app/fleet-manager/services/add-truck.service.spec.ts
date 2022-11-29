import { TestBed } from '@angular/core/testing';

import { AddTruckService } from './add-truck.service';
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('AddTruckService', () => {
  let service: AddTruckService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpClient,HttpHandler]
    });
    service = TestBed.inject(AddTruckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
