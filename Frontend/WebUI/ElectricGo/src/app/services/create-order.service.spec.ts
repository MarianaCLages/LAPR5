import { TestBed } from '@angular/core/testing';

import { CreateOrderService } from './create-order.service';
import {HttpClient, HttpHandler} from "@angular/common/http";
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import IOrderDTO from '../shared/orderDTO';

describe('CreateOrderService', () => {
  let service: CreateOrderService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CreateOrderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return an HTTP Response', () => {
    const httpTestingController = TestBed.inject(HttpTestingController);
    const orderDTO = {

    } as IOrderDTO;

    service.createOrder(orderDTO).subscribe((data) => {
      expect(data).toBeTruthy();
    });

    const req = httpTestingController.expectOne('https://localhost:5001/api/Order');
    expect(req.request.method).toEqual('POST');
    expect(req.request.body).toEqual(orderDTO);
  });
});
