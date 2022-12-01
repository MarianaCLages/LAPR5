import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePathComponent } from './create-path.component';
import { CreatePathServiceService } from "../../../services/create-path-service.service";
import { GetWarehouseServiceService } from "../../../services/get-warehouse-service.service";
import { Observable } from "rxjs";

describe('CreatePathComponent', () => {
  let component: CreatePathComponent;
  let fixture: ComponentFixture<CreatePathComponent>;


  beforeEach(async () => {
    const createPathServiceSpy = jasmine.createSpyObj('CreatePathServiceService', ['createPath']);
    createPathServiceSpy.createPath.and.returnValue(Observable.create(
      /*{
        beginningWarehouseId: "1"
      }*/
    ));
    const getWarehouseServiceSpy = jasmine.createSpyObj('GetWarehouseServiceService', ['getWarehouses']);
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
      declarations: [CreatePathComponent],
      providers: [{
        provide: CreatePathServiceService,
        useValue: createPathServiceSpy
      },
      { provide: GetWarehouseServiceService, useValue: getWarehouseServiceSpy }]
    })
      .compileComponents();

    TestBed.inject(CreatePathServiceService)
    TestBed.inject(GetWarehouseServiceService)

    fixture = TestBed.createComponent(CreatePathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should call the service on init', function () {


    let fakeWarehouseService = TestBed.inject(GetWarehouseServiceService);
    let fakeCreatePathService = TestBed.inject(CreatePathServiceService);
    component = new CreatePathComponent(fakeCreatePathService, fakeWarehouseService);


    component.ngOnInit();

    expect(fakeWarehouseService.getWarehouses).toHaveBeenCalled();

  });

  it('should call the service on createTruck', function () {

    let fakeWarehouseService = TestBed.inject(GetWarehouseServiceService);
    let fakeCreatePathService = TestBed.inject(CreatePathServiceService);
    component = new CreatePathComponent(fakeCreatePathService, fakeWarehouseService);

    //sets the values
    component.initialWarehouse = {
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
    component.destinationWarehouse = {
      "latitudeDegree": 0,
      "latitudeMinute": 0,
      "latitudeSecond": 0,
      "longitudeDregree": 0,
      "longitudeMinute": 5,
      "longitudeSecond": 0,
      "designation": "Warehouse A2",
      "street": "Address A2",
      "doorNumber": 0,
      "postalCode": 0,
      "city": "City A2",
      "country": "Country A2",
      "alphaNumId": "A2"
    }
    component.distance = 5;
    component.time = 5;
    component.energyNeeded = 5;
    component.timeToCharge = 5;


    component.createTruck();

    expect(fakeCreatePathService.createPath).toHaveBeenCalled();

  });
  it('should send an error message if an error occurs', function () {

    let fakeWarehouseService = TestBed.inject(GetWarehouseServiceService);
    let fakeCreatePathService = jasmine.createSpyObj('CreatePathServiceService', ['createPath']);
    //fake CreatePathServiceService returns an error
    fakeCreatePathService.createPath.and.returnValue(Observable.create(
      {
        error: "error"
      }
    ));

    component = new CreatePathComponent(fakeCreatePathService, fakeWarehouseService);

    //sets the values
    component.initialWarehouse = {
      "latitudeDegree": 0,
      "latitudeMinute": 0,
      "latitudeSecond": -1,
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
    component.destinationWarehouse = {
      "latitudeDegree": 0,
      "latitudeMinute": 0,
      "latitudeSecond": 0,
      "longitudeDregree": 0,
      "longitudeMinute": 5,
      "longitudeSecond": 0,
      "designation": "Warehouse A2",
      "street": "Address A2",
      "doorNumber": 0,
      "postalCode": 0,
      "city": "City A2",
      "country": "Country A2",
      "alphaNumId": "A2"
    }
    component.distance = 5;
    component.time = -1;
    component.energyNeeded = 5;
    component.timeToCharge = 5;


    component.createTruck();

    //verifies that the error message is not empty
    expect(component.errorMessage).not.toBe("");
  });

  it('should send the correct error message if an error occurs', function () {
    let fakeWarehouseService = TestBed.inject(GetWarehouseServiceService);
    // fake create path return an 404 error
    let fakeCreatePathService = jasmine.createSpyObj('CreatePathServiceService', ['createPath']);
    fakeCreatePathService.createPath.and.returnValue(Observable.create(
      {
        data: {
          status: 404
        },
        error: {
          status: 400,
          error: "error"
        }
      }
    ));

    component = new CreatePathComponent(fakeCreatePathService, fakeWarehouseService);

    //sets the values
    component.initialWarehouse = {
      "latitudeDegree": 0,
      "latitudeMinute": 0,
      "latitudeSecond": -1,
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
    component.destinationWarehouse = {
      "latitudeDegree": 0,
      "latitudeMinute": 0,
      "latitudeSecond": 0,
      "longitudeDregree": 0,
      "longitudeMinute": 5,
      "longitudeSecond": 0,
      "designation": "Warehouse A2",
      "street": "Address A2",
      "doorNumber": 0,
      "postalCode": 0,
      "city": "City A2",
      "country": "Country A2",
      "alphaNumId": "A2"
    }
    component.distance = 5;
    component.time = -1;
    component.energyNeeded = 5;
    component.timeToCharge = 5;


    component.createTruck();

    //verifies that the error message is not empty
    expect(component.errorMessage).toBe("An unknown error has ocurred");
  });
});

