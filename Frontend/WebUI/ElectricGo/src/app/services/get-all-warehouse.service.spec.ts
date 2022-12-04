import { TestBed } from '@angular/core/testing';

import {HttpClient, HttpHandler} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {GetAllWarehouseService} from "./get-all-warehouse.service";
import {GetWarehouseAlphaService} from "./get-warehouse-alpha-service.service";
import IOrderDTO from "../shared/orderDTO";
import {ICreateWarehouseDTO} from "../shared/createWarehouseDTO";

describe('GetAllWarehouseService', () => {
  let service: GetAllWarehouseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(GetAllWarehouseService);
  });

  it('should get all warehouses', () => {

    const http = TestBed.inject(HttpClient);
    const httpTestingController = TestBed.inject(HttpTestingController);

    let service = new GetAllWarehouseService(http);
    
    service.getAllWarehouse().then((data:ICreateWarehouseDTO) => {
      expect(data).toBeTruthy();
    });

  });
});
