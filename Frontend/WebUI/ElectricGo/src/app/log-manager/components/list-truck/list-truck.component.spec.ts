import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTruckComponent } from './list-truck.component';
import {HttpClient, HttpHandler} from "@angular/common/http";
import { GetTrucksService } from 'src/app/services/get-trucks.service';
import { ITruckDTO } from 'src/app/shared/truckDTO';

describe('ListTruckComponent', () => {
  let component: ListTruckComponent;
  let fixture: ComponentFixture<ListTruckComponent>;

  beforeEach(async () => {
    const listTruckServiceFake = jasmine.createSpyObj('GetTrucksService', ['getTrucks']);
    listTruckServiceFake.getTrucks.and.returnValue(Promise.resolve(
      [
        {
          "caractTruck": "T01",
          "truckPlate": "AA-77-BB",
          "weightCapacity": 2000,
          "cargaMax": 100,
          "totalBatCharge": 100,
          "tare": 1500,
          "chargingTime": 50,
          "activeTruck" : true
        },
        {
          "caractTruck": "T02",
          "truckPlate": "AA-76-BB",
          "weightCapacity": 800,
          "cargaMax": 100,
          "totalBatCharge": 100,
          "tare": 1000,
          "chargingTime": 30,
          "activeTruck" : true
        }
      ]
    ));

    await TestBed.configureTestingModule({
      declarations: [ ListTruckComponent ],
      providers: [
        HttpClient,
        HttpHandler,
        { provide: 'GetTrucksService', useValue: listTruckServiceFake }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should exist an array of trucks after init', () => {
    let serviceFake = {
      getTrucks: () => {
        //create an ITruckDTO array
        let trucks: ITruckDTO[] = [
          {
            "caractTruck": "T01",
            "truckPlate": "AA-77-BB",
            "weightCapacity": 2000,
            "cargaMax": 100,
            "totalBatCharge": 100,
            "tare": 1500,
            "chargingTime": 50,
            "activeTruck" : true
          },
          {
            "caractTruck": "T02",
            "truckPlate": "AA-76-BB",
            "weightCapacity": 800,
            "cargaMax": 100,
            "totalBatCharge": 100,
            "tare": 1000,
            "chargingTime": 30,
            "activeTruck" : true
          }
        ];
        return Promise.resolve(trucks);
      }
    } as GetTrucksService;

    component = new ListTruckComponent(serviceFake);

    component.ngOnInit();

    //wait for the promise to resolve
    fixture.whenStable().then(() => {
      expect(component.trucks).toBeTruthy();
      expect(component.trucks.data.length).toBe(2);
    });
  });

  it('should go back when the back button is clicked', () => {
    component.goBack();
    expect(component).toBeTruthy();
  });
});
