import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTruckComponent } from './add-truck.component';
import {HttpClient, HttpHandler} from "@angular/common/http";
import { AddTruckService } from '../../services/add-truck.service';
import { Observable } from 'rxjs';

describe('AddTruckComponent', () => {
  let component: AddTruckComponent;
  let fixture: ComponentFixture<AddTruckComponent>;

  beforeEach(async () => {
    const addTruckServiceSpy = jasmine.createSpyObj('AddTruckService', ['addTruck']);
    addTruckServiceSpy.addTruck.and.returnValue(Promise.resolve(Observable.create([{
      "caractTruck": "eTruck05",
      "truckPlate": "AB-22-CD",
      "tare": 1000,
      "weightCapacity": 1000,
      "totalBatCharge": 1000,
      "cargaMax": 1000,
      "chargingTime": 1000
  }])));

    await TestBed.configureTestingModule({
      declarations: [ AddTruckComponent ],
      providers: [{
        provide: AddTruckService,
        useValue: addTruckServiceSpy
      } ]

    })
    .compileComponents();

    TestBed.inject(AddTruckService)

    fixture = TestBed.createComponent(AddTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should send an error message if an error occurs', function () {
    let fakeAddTruckService = jasmine.createSpyObj('AddTruckService', ['addTruck']);
    fakeAddTruckService.addTruck.and.returnValue(Observable.create(
      {
      error: "error"
  }
  ));
  component = new AddTruckComponent(fakeAddTruckService);

  component.caractTruck = "eTruck05";
  component.truckPlate = "AA-22-CD";
  component.tare = -1000;
  component.weightCapacity = 1000;
  component.totalBatCharge = 1000;
  component.cargaMax = 1000;
  component.chargingTime = 1000;

    component.addTruck();

    expect(component.errorMessage).not.toBe("");

  });

  it('should send the correct error message if an error occurs', function () {
    let fakeAddTruckService = jasmine.createSpyObj('AddTruckService', ['addTruck']);
    fakeAddTruckService.addTruck.and.returnValue(Observable.create(
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

    component = new AddTruckComponent(fakeAddTruckService);

    component.caractTruck = "eTruck06";
    component.truckPlate = "AB-35-DD";
    component.tare = -100;
    component.weightCapacity = 100;
    component.totalBatCharge = 100;
    component.cargaMax = 100;
    component.chargingTime = 10;

    component.addTruck();

    expect(component.errorMessage).toBe("An unknown error has ocurred");

  });
});
