import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetWarehouseComponent } from './get-warehouse.component';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {Observable} from "rxjs";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {GetWarehouseAlphaService} from "../../../services/get-warehouse-alpha-service.service";
import {AddWarehouseComponent} from "../add-warehouse/add-warehouse.component";

describe('GetWarehouseComponent', () => {
  let component: GetWarehouseComponent;
  let fixture: ComponentFixture<GetWarehouseComponent>;

  beforeEach(async () => {

    const getWarehouseServiceSpy = jasmine.createSpyObj('GetWarehouseService', ['getWarehouses']);
    getWarehouseServiceSpy.getWarehouses.and.returnValue(Observable.create(
    ));

    await TestBed.configureTestingModule({
      declarations: [ GetWarehouseComponent ],
      imports: [HttpClientTestingModule],
      providers:[{
        provide: GetWarehouseAlphaService,
        useValue: getWarehouseServiceSpy
      },
      ]
    })
      .compileComponents();

    TestBed.inject(GetWarehouseAlphaService)

    fixture = TestBed.createComponent(GetWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();



  });

  it('should call the service get Warehouse', () => {
    let fakeGetWarehouseService = TestBed.inject(GetWarehouseAlphaService);

    component = new GetWarehouseComponent(fakeGetWarehouseService);

    component.alphaId = 'C20';
    component.getWarehouse();

    expect(fakeGetWarehouseService.getWarehouses).toHaveBeenCalled();
  });


  it('should send an error message if an error occurs', function () {


    let fakeGetWarehouseService1 = jasmine.createSpyObj('GetWarehouseAlphaService', ['getWarehouses']);
    //fake CreatePathServiceService returns an error
    fakeGetWarehouseService1.getWarehouses.and.returnValue(Observable.create(
      {
        error: "error"
      }
    ));

    component = new GetWarehouseComponent(fakeGetWarehouseService1);

    component.alphaId = 1111;

    component.getWarehouse();

    expect(component.errorMessage).not.toBe("");
  });

  it('should send the correct error message if an error occurs', function () {


    let fakeGetWarehouse1 = jasmine.createSpyObj('GetWarehouseAlphaService', ['getWarehouses']);
    //fake CreatePathServiceService returns an error
    fakeGetWarehouse1.getWarehouses.and.returnValue(Observable.create(
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

    component = new GetWarehouseComponent(fakeGetWarehouse1);



    //sets the values
    component.alphaId = 1111;


    component.getWarehouse();

    expect(component.errorMessage).toBe("An unknown error has ocurred");

  });

});
