import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddWarehouseComponent } from './add-warehouse.component';
import {AddWarehouseService} from "../../../services/add-warehouse.service";
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {CreatePathComponent} from "../../../log-manager/components/create-path/create-path.component";
import {GetWarehouseServiceService} from "../../../services/get-warehouse-service.service";



describe('AddWarehouseComponent', () => {
  let component: AddWarehouseComponent;
  let fixture: ComponentFixture<AddWarehouseComponent>;

  beforeEach(async () => {

    const addWarehouseServiceSpy = jasmine.createSpyObj('AddWarehouseService', ['addWarehouse']);
    addWarehouseServiceSpy.addWarehouse.and.returnValue(Observable.create(
    ));

    await TestBed.configureTestingModule({
      declarations: [ AddWarehouseComponent ],
      imports: [HttpClientTestingModule],
      providers:[{
        provide: AddWarehouseService,
        useValue: addWarehouseServiceSpy
      },
    ]
    })
      .compileComponents();

    TestBed.inject(AddWarehouseService)

    fixture = TestBed.createComponent(AddWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();


  });


  it('should call the service add Warehouse', function () {



    let fakeAddWarehouseService = TestBed.inject(AddWarehouseService);
    component = new AddWarehouseComponent(fakeAddWarehouseService);

    //sets the values
    component.alphaNumericId = "C99";
    component.latitudeSeconds = 10;
    component.latitudeDegree = 20;
    component.latitudeMinutes = 39;
    component.longitudeSeconds = 20;
    component.longitudeDegree = 21;
    component.longitudeMinutes = 30;
    component.city = "CidadeTeste";
    component.doorNumber = 100;
    component.street = "CidadeTeste";
    component.country = "PaisTeste";
    component.postalCode = "TestePostal";
    component.designation = "TesteDesignacao";

    component.addWarehouse();

    expect(fakeAddWarehouseService.addWarehouse).toHaveBeenCalled();
  });


  it('should send an error message if an error occurs', function () {


    let fakeAddWarehouseService1 = jasmine.createSpyObj('AddWarehouseService', ['addWarehouse']);
    //fake CreatePathServiceService returns an error
    fakeAddWarehouseService1.addWarehouse.and.returnValue(Observable.create(
      {
        error: "error"
      }
    ));

    component = new AddWarehouseComponent(fakeAddWarehouseService1);

    //sets the values
    component.alphaNumericId = "C99";
    component.latitudeSeconds = -10;
    component.latitudeDegree = -20;
    component.latitudeMinutes = -39;
    component.longitudeSeconds = -20;
    component.longitudeDegree = -21;
    component.longitudeMinutes = 30;
    component.city = "CidadeTeste";
    component.doorNumber = 100;
    component.street = "CidadeTeste";
    component.country = "PaisTeste";
    component.postalCode = "TestePostal";
    component.designation = "TesteDesignacao";

    component.addWarehouse();

    expect(component.errorMessage).not.toBe("");
  });


  it('should send the correct error message if an error occurs', function () {


    let fakeAddWarehouseService1 = jasmine.createSpyObj('AddWarehouseService', ['addWarehouse']);
    //fake CreatePathServiceService returns an error
    fakeAddWarehouseService1.addWarehouse.and.returnValue(Observable.create(
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

    component = new AddWarehouseComponent(fakeAddWarehouseService1);



    //sets the values
    component.alphaNumericId = "C99";
    component.latitudeSeconds = -10;
    component.latitudeDegree = -20;
    component.latitudeMinutes = -39;
    component.longitudeSeconds = -20;
    component.longitudeDegree = -21;
    component.longitudeMinutes = 30;
    component.city = "CidadeTeste";
    component.doorNumber = 100;
    component.street = "CidadeTeste";
    component.country = "PaisTeste";
    component.postalCode = "TestePostal";
    component.designation = "TesteDesignacao";


    component.addWarehouse();

    expect(component.errorMessage).toBe("An unknown error has ocurred");

  });




});
