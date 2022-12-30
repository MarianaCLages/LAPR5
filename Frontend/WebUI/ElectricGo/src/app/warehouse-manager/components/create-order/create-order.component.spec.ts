import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrderComponent } from './create-order.component';
import { CreateOrderService } from 'src/app/services/create-order.service';
import { GetWarehouseServiceService } from 'src/app/services/get-warehouse-service.service';
import {Observable} from "rxjs";
import { GoogleApiCommunicationService } from 'src/app/services/google-api-communication.service';
import { RedirectPagesService } from 'src/app/services/redirect-pages.service';

describe('CreateOrderComponent', () => {
  let component: CreateOrderComponent;
  let fixture: ComponentFixture<CreateOrderComponent>;

  beforeEach(async () => {
    const createOrderServiceSpy = jasmine.createSpyObj('CreateOrderService',['createOrder']);
    let fakeGoogleApiService =  jasmine.createSpyObj('GoogleApiCommunicationService',['']);
    let fakeRedirectService = jasmine.createSpyObj('RedirectPagesService',['']);
    createOrderServiceSpy.createOrder.and.returnValue(Observable.create(
      /*
      "orderDate": "2021-05-20",
      "orderMass": 80,
      "chargingTime": 40,
      "unloadingTime": 40
      */
  ));
    const getWarehouseServiceSpy = jasmine.createSpyObj('GetWarehouseServiceService',['getWarehouses']);
    getWarehouseServiceSpy.getWarehouses.and.returnValue(Promise.resolve(Observable.create([{
      "alphaNumId": "A1",
      "name": "Warehouse A1",
      "address": "Address A1",
      "latitude": 0,
      "longitude": 0,
      "capacity": 100,
      "currentStock": 0,
      "currentEnergy": 0,
      "currentEnergyPercentage": 0,
      "currentEnergyPercentageString": "0%",
      "currentEnergyString": "0",
      "currentStockString": "0",
      "capacityString": "100",
      "currentEnergyPercentageColor": "red"
    }])));

    await TestBed.configureTestingModule({
      declarations: [ CreateOrderComponent ],
      providers: [{
        provide: CreateOrderService,
        useValue: createOrderServiceSpy
      },
      { provide: GetWarehouseServiceService, useValue: getWarehouseServiceSpy },
      { provide: 'GoogleApiCommunicationService', useValue: fakeGoogleApiService },
      { provide: 'RedirectPagesService', useValue: fakeRedirectService },]
    })
    .compileComponents();

    TestBed.inject(CreateOrderService);
    TestBed.inject(GetWarehouseServiceService);

    fixture = TestBed.createComponent(CreateOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should call the service on init', function () {
    let fakeCreateOrderService = TestBed.inject(CreateOrderService);
    let fakeWarehouseService = TestBed.inject(GetWarehouseServiceService);
    let fakeGoogleApiService = TestBed.inject(GoogleApiCommunicationService);
    let fakeRedirectService = TestBed.inject(RedirectPagesService);
    component = new CreateOrderComponent(fakeCreateOrderService, fakeWarehouseService, fakeGoogleApiService, fakeRedirectService);

    component.ngOnInit();

    expect(fakeWarehouseService.getWarehouses).toHaveBeenCalled();
  });

  it('should call the service on createOrder', function () {
    let fakeCreateOrderService = TestBed.inject(CreateOrderService);
    let fakeWarehouseService = TestBed.inject(GetWarehouseServiceService);
    let fakeGoogleApiService = TestBed.inject(GoogleApiCommunicationService);
    let fakeRedirectService = TestBed.inject(RedirectPagesService);
    component = new CreateOrderComponent(fakeCreateOrderService, fakeWarehouseService, fakeGoogleApiService, fakeRedirectService);

    component.orderDate = new Date("2023-01-10");
    component.orderMass = 80;
    component.chargingTime = 40;
    component.unloadingTime = 40;
    component.warehouseId = {
      "latitudeDegree": 0,
      "latitudeMinute": 0,
      "latitudeSecond": 0,
      "longitudeDregree": 0,
      "longitudeMinute": 0,
      "longitudeSecond": 0,
      "designation": "Warehouse A1",
      "street": "Address A1",
      "doorNumber": 0,
      "postalCode": 0,
      "city": "City A1",
      "country": "Country A1",
      "alphaNumId": "A1"
    }

    component.createOrder();

    expect(fakeCreateOrderService.createOrder).toHaveBeenCalled();
  });

  it('should send an error message if an error occurs', function () {
    let fakeCreateOrderService = jasmine.createSpyObj('CreateOrderService',['createOrder']);
    let fakeWarehouseService = TestBed.inject(GetWarehouseServiceService);
    let fakeGoogleApiService = TestBed.inject(GoogleApiCommunicationService);
    let fakeRedirectService = TestBed.inject(RedirectPagesService);
    //fake CreateOrderService returns an error
    fakeCreateOrderService.createOrder.and.returnValue(Observable.create(
      {
        error: "error"
      }
    ));

    component = new CreateOrderComponent(fakeCreateOrderService, fakeWarehouseService, fakeGoogleApiService, fakeRedirectService);

    //set all required fields
    component.orderDate = new Date("2023-01-10");
    component.orderMass = 80;
    component.chargingTime = 40;
    component.unloadingTime = 40;
    component.warehouseId = {
      "latitudeDegree": 0,
      "latitudeMinute": 0,
      "latitudeSecond": 0,
      "longitudeDregree": 0,
      "longitudeMinute": 0,
      "longitudeSecond": 0,
      "designation": "Warehouse A1",
      "street": "Address A1",
      "doorNumber": 0,
      "postalCode": 0,
      "city": "City A1",
      "country": "Country A1",
      "alphaNumId": "A1"
    }

    component.createOrder();

    //verifies that the error message is not empty
    expect(component.errorMessage).not.toBe("");
  });

  it('should send the correct error message if an error occurs', function () {
    //fake CreateOrderService returns a 404 error
    let fakeCreateOrderService = jasmine.createSpyObj('CreateOrderService',['createOrder']);
    let fakeWarehouseService = TestBed.inject(GetWarehouseServiceService);
    let fakeGoogleApiService = TestBed.inject(GoogleApiCommunicationService);
    let fakeRedirectService = TestBed.inject(RedirectPagesService);

    fakeCreateOrderService.createOrder.and.returnValue(Observable.create(
      {
        data: {
          status: 404,
        },
        error: {
          status: 400,
          error: "error"
        }
      }
    ));

    component = new CreateOrderComponent(fakeCreateOrderService, fakeWarehouseService, fakeGoogleApiService, fakeRedirectService);

    //set all required fields
    component.orderDate = new Date("2023-01-10");
    component.orderMass = 80;
    component.chargingTime = 40;
    component.unloadingTime = 40;
    component.warehouseId = {
      "latitudeDegree": 0,
      "latitudeMinute": 0,
      "latitudeSecond": 0,
      "longitudeDregree": 0,
      "longitudeMinute": 0,
      "longitudeSecond": 0,
      "designation": "Warehouse A1",
      "street": "Address A1",
      "doorNumber": 0,
      "postalCode": 0,
      "city": "City A1",
      "country": "Country A1",
      "alphaNumId": "A1"
    }

    component.createOrder();

    //verifies that the error message is correct
    expect(component.errorMessage).toBe("An unknown error has occurred!");
  });
});
