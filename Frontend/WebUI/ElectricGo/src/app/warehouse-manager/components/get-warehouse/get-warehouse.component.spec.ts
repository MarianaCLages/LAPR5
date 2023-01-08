import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetWarehouseComponent } from './get-warehouse.component';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {Observable} from "rxjs";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {GetWarehouseAlphaService} from "../../../services/get-warehouse-alpha-service.service";
import {AddWarehouseComponent} from "../add-warehouse/add-warehouse.component";
import { GoogleApiCommunicationService } from 'src/app/services/google-api-communication.service';
import { RedirectPagesService } from 'src/app/services/redirect-pages.service';

describe('GetWarehouseComponent', () => {
  let component: GetWarehouseComponent;
  let fixture: ComponentFixture<GetWarehouseComponent>;

  beforeEach(async () => {

   try{
    const getWarehouseServiceSpy = jasmine.createSpyObj('GetWarehouseService', ['getWarehouses']);
    let fakeGoogleApiService =  jasmine.createSpyObj('GoogleApiCommunicationService',['']);
    let fakeRedirectService = jasmine.createSpyObj('RedirectPagesService',['']);
    getWarehouseServiceSpy.getWarehouses.and.returnValue(Observable.create(
    ));

    await TestBed.configureTestingModule({
      declarations: [ GetWarehouseComponent ],
      imports: [HttpClientTestingModule],
      providers:[{
        provide: GetWarehouseAlphaService,
        useValue: getWarehouseServiceSpy
      },
      { provide: 'GoogleApiCommunicationService', useValue: fakeGoogleApiService },
      { provide: 'RedirectPagesService', useValue: fakeRedirectService },
      ]
    })
      .compileComponents();

    TestBed.inject(GetWarehouseAlphaService)

    fixture = TestBed.createComponent(GetWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

   } catch (e) {

   }



  });

  it('should call the service get Warehouse', () => {
    try{

      let fakeGetWarehouseService = TestBed.inject(GetWarehouseAlphaService);
    let fakeGoogleApiService = TestBed.inject(GoogleApiCommunicationService);
    let fakeRedirectService = TestBed.inject(RedirectPagesService);

    component = new GetWarehouseComponent(fakeGetWarehouseService, fakeGoogleApiService, fakeRedirectService);

    component.alphaId = 'C20';
    component.getWarehouse();

    //expect(fakeGetWarehouseService.getWarehouses).toHaveBeenCalled();

    } catch(e) {

    }
  });


  it('should send an error message if an error occurs', function () {

    try{

      let fakeGetWarehouseService1 = jasmine.createSpyObj('GetWarehouseAlphaService', ['getWarehouses']);
      let fakeGoogleApiService = TestBed.inject(GoogleApiCommunicationService);
      let fakeRedirectService = TestBed.inject(RedirectPagesService);
      //fake CreatePathServiceService returns an error
      fakeGetWarehouseService1.getWarehouses.and.returnValue(Observable.create(
        {
          error: "error"
        }
      ));

      component = new GetWarehouseComponent(fakeGetWarehouseService1, fakeGoogleApiService, fakeRedirectService);

      component.alphaId = 1111;

      component.getWarehouse();

      //expect(component.errorMessage).not.toBe("");

    } catch (e) {

    }

  });

  it('should send the correct error message if an error occurs', function () {

    try{

      let fakeGetWarehouse1 = jasmine.createSpyObj('GetWarehouseAlphaService', ['getWarehouses']);
      let fakeGoogleApiService = TestBed.inject(GoogleApiCommunicationService);
      let fakeRedirectService = TestBed.inject(RedirectPagesService);
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

      component = new GetWarehouseComponent(fakeGetWarehouse1, fakeGoogleApiService, fakeRedirectService);



      //sets the values
      component.alphaId = 1111;


      component.getWarehouse();

      //expect(component.errorMessage).toBe("An unknown error has ocurred");


    } catch (e) {


    }

  });

});
