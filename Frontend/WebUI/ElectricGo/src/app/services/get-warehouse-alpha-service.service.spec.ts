/*import { TestBed } from '@angular/core/testing';

import {HttpClient, HttpHandler} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {GetWarehouseAlphaService} from "./get-warehouse-alpha-service.service";
import {AppConfigServiceService} from "./app-config-service.service";
import {GetOrdersService} from "./get-orders.service";
import IOrderDTO from "../shared/orderDTO";
import {ICreateWarehouseDTO} from "../shared/createWarehouseDTO";

describe('GetWarehouseAlphaService', () => {
  let service: GetWarehouseAlphaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(GetWarehouseAlphaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a warehouse', () => {



    const http = TestBed.inject(HttpClient);
    const httpTestingController = TestBed.inject(HttpTestingController);

    let service = new GetWarehouseAlphaService(http);

    let data = service.getWarehouses('C02');
      expect(data).toBeTruthy();

  });
});*/
