import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetAllWarehousesComponent } from './get-all-warehouses.component';
import {HttpClient, HttpHandler} from "@angular/common/http";
import {Observable} from "rxjs";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {GetAllWarehouseService} from "../../../services/get-all-warehouse.service";
import {AddWarehouseService} from "../../../services/add-warehouse.service";
import {AddWarehouseComponent} from "../add-warehouse/add-warehouse.component";

describe('GetAllWarehouseComponent', () => {
  let component: GetAllWarehousesComponent;
  let fixture: ComponentFixture<GetAllWarehousesComponent>;

  beforeEach(async () => {

    const getallWarehouseServiceSpy = jasmine.createSpyObj('GetAllWarehouseService', ['getAllWarehouse']);
    getallWarehouseServiceSpy.getAllWarehouse.and.returnValue(Observable.create(
    ));


    await TestBed.configureTestingModule({
      declarations: [ GetAllWarehousesComponent ],
      imports: [HttpClientTestingModule],
      providers:[{
        provide: GetAllWarehouseService,
        useValue: getallWarehouseServiceSpy
      },
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

    component = new GetAllWarehousesComponent(fakeGetAllWarehouseService);

    component.ngOnInit();

    expect(fakeGetAllWarehouseService.getAllWarehouse).toHaveBeenCalled();

  });
});
