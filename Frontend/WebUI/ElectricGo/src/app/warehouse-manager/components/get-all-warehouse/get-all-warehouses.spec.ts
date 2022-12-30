import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetAllWarehousesComponent } from './get-all-warehouses.component';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {Observable} from "rxjs";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {GetAllWarehouseService} from "../../../services/get-all-warehouse.service";
import {AddWarehouseService} from "../../../services/add-warehouse.service";
import {AddWarehouseComponent} from "../add-warehouse/add-warehouse.component";
import { GoogleApiCommunicationService } from 'src/app/services/google-api-communication.service';
import { RedirectPagesService } from 'src/app/services/redirect-pages.service';

describe('GetAllWarehouseComponent', () => {
  let component: GetAllWarehousesComponent;
  let fixture: ComponentFixture<GetAllWarehousesComponent>;

  beforeEach(async () => {

    const getallWarehouseServiceSpy = jasmine.createSpyObj('GetAllWarehouseService', ['getAllWarehouse']);
    let fakeGoogleApiService =  jasmine.createSpyObj('GoogleApiCommunicationService',['']);
    let fakeRedirectService = jasmine.createSpyObj('RedirectPagesService',['']);
    getallWarehouseServiceSpy.getAllWarehouse.and.returnValue(Observable.create(
    ));


    await TestBed.configureTestingModule({
      declarations: [ GetAllWarehousesComponent ],
      imports: [HttpClientTestingModule],
      providers:[{
        provide: GetAllWarehouseService,
        useValue: getallWarehouseServiceSpy
      },
      { provide: 'GoogleApiCommunicationService', useValue: fakeGoogleApiService },
      { provide: 'RedirectPagesService', useValue: fakeRedirectService },
      ]
    })
      .compileComponents();

    TestBed.inject(GetAllWarehouseService)

    fixture = TestBed.createComponent(GetAllWarehousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();


  });

  it('should call the service get all Warehouse', () => {
    let fakeGetAllWarehouseService = TestBed.inject(GetAllWarehouseService);
    let fakeGoogleApiService = TestBed.inject(GoogleApiCommunicationService);
    let fakeRedirectService = TestBed.inject(RedirectPagesService);

    component = new GetAllWarehousesComponent(fakeGetAllWarehouseService, fakeGoogleApiService, fakeRedirectService);

    component.ngOnInit();

    expect(fakeGetAllWarehouseService.getAllWarehouse).toHaveBeenCalled();

  });
});
