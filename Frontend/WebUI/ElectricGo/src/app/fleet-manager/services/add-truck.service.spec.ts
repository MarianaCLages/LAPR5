import { TestBed } from '@angular/core/testing';

import { AddTruckService } from './add-truck.service';
import {HttpClient, HttpHandler} from "@angular/common/http";
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddTruckService', () => {
  let service: AddTruckService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AddTruckService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
