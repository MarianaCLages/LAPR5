import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { ListOrdersComponent } from './list-orders.component';
import { GetOrdersService } from 'src/app/services/get-orders.service';
import IOrderDTO from 'src/app/shared/orderDTO';
import { GoogleApiCommunicationService } from 'src/app/services/google-api-communication.service';
import { RedirectPagesService } from 'src/app/services/redirect-pages.service';

describe('ListOrdersComponent', () => {
  let component: ListOrdersComponent;
  let fixture: ComponentFixture<ListOrdersComponent>;

  beforeEach(async () => {
    const listOrderServiceFake = jasmine.createSpyObj('GetOrdersService', ['getOrders']);
    let fakeGoogleApiService =  jasmine.createSpyObj('GoogleApiCommunicationService',['']);
    let fakeRedirectService = jasmine.createSpyObj('RedirectPagesService',['']);
    listOrderServiceFake.getOrders.and.returnValue(Promise.resolve(
      [
        {
          "identifier": "221212/5",
          "orderDate": "2023-12-21",
          "orderMass": 80,
          "chargingTime": 40,
          "unloadingTime": 40,
          "warehouseId": "C20"
        },
        {
          "identifier": "221231/1",
          "orderDate": "2023-10-14",
          "orderMass": 20,
          "chargingTime": 12,
          "unloadingTime": 10,
          "warehouseId": "C22"
        }
      ]
    ));

    await TestBed.configureTestingModule({
      declarations: [ ListOrdersComponent ],
      providers: [
        HttpClient,
        HttpHandler,
        { provide: 'GetOrdersService', useValue: listOrderServiceFake },
        { provide: 'GoogleApiCommunicationService', useValue: fakeGoogleApiService },
        { provide: 'RedirectPagesService', useValue: fakeRedirectService },
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should exist an array of orders after init', () => {
    let fakeGoogleApiService = TestBed.inject(GoogleApiCommunicationService);
    let fakeRedirectService = TestBed.inject(RedirectPagesService);
    let serviceFake = {
      getOrders: () => {
        //create an IOrderDTO array
        let orders: IOrderDTO[] = [
          {
            "identifier": "221212/5",
            "orderDate": new Date(2023-7-21),
            "orderMass": 80,
            "chargingTime": 40,
            "unloadingTime": 40,
            "warehouseId": "C20"
          },
          {
            "identifier": "221231/1",
            "orderDate": new Date("2023-9-14"),
            "orderMass": 20,
            "chargingTime": 12,
            "unloadingTime": 10,
            "warehouseId": "C22"
          }
        ];
        return Promise.resolve(orders);
      }
    } as GetOrdersService;

    component = new ListOrdersComponent(serviceFake, fakeGoogleApiService, fakeRedirectService);

    component.ngOnInit();

    //wait for the promise to resolve
    fixture.whenStable().then(() => {
      expect(component.orders).toBeTruthy();
      expect(component.orders.data.length).toBe(2);
    });
  });

  it('should work the back button when clicked', () => {
    component.goBack();
    expect(component).toBeTruthy();
  });
});
