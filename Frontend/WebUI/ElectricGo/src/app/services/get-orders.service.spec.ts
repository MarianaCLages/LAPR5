/*
import {TestBed} from '@angular/core/testing';

import {GetOrdersService} from './get-orders.service';
import {HttpClient} from "@angular/common/http";
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {AppConfigServiceService} from "./app-config-service.service";
import IOrderDTO from "../shared/orderDTO";
import { GoogleApiCommunicationService } from "./google-api-communication.service";

describe('GetOrdersService', () => {
  let service: GetOrdersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(GetOrdersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an array of orders', () => {
    let fakeAppConfigService = {
      getWarehouseURL: () => 'https://localhost:5001/api/',
      getAllOrdersURL: () => 'Order'
    } as AppConfigServiceService;
    const http = TestBed.inject(HttpClient);
    const httpTestingController = TestBed.inject(HttpTestingController);
    let fakeGoogleService = {

    } as GoogleApiCommunicationService

    let service = new GetOrdersService(http, fakeAppConfigService,fakeGoogleService);

    service.getOrders().then((data:IOrderDTO) => {
      expect(data).toBeTruthy();
    });
  });
});
*/
