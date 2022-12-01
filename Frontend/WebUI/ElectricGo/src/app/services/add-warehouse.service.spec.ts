import { TestBed } from '@angular/core/testing';

import {HttpClient, HttpHandler} from "@angular/common/http";
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {AddWarehouseService} from "./add-warehouse.service";

describe('AddWarehouseService', () => {
  let service: AddWarehouseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(AddWarehouseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
