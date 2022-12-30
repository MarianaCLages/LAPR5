import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClient, HttpHandler } from "@angular/common/http";

import { GetPathsService } from 'src/app/services/get-paths.service';
import IPathDTO from 'src/app/shared/pathDTO';
import { ListPathsComponent } from './list-paths.component';
import { GoogleApiCommunicationService } from 'src/app/services/google-api-communication.service';
import { RedirectPagesService } from 'src/app/services/redirect-pages.service';

describe('ListPathsComponent', () => {
  let component: ListPathsComponent;
  let fixture: ComponentFixture<ListPathsComponent>;

  beforeEach(async () => {

    const listPathServiceFake = jasmine.createSpyObj('ListPathService', ['getPaths']);
    let fakeGoogleApiService =  jasmine.createSpyObj('GoogleApiCommunicationService',['']);
    let fakeRedirectService = jasmine.createSpyObj('RedirectPagesService',['']);
    listPathServiceFake.getPaths.and.returnValue(Promise.resolve(
      [
        {
          "beginningWarehouseId": "A1",
          "endingWarehouseId": "A2",
          "energy": 100,
          "distance": 100,
          "time": 100,
        },
        {
          "beginningWarehouseId": "A1",
          "endingWarehouseId": "A2",
          "energy": 100,
          "distance": 100,
          "time": 100,
        }
      ]
    ));
    await TestBed.configureTestingModule({
      declarations: [ListPathsComponent],
      providers: [
        HttpClient,
        HttpHandler,
        { provide: 'GetPathsService', useValue: listPathServiceFake },
        { provide: 'GoogleApiCommunicationService', useValue: fakeGoogleApiService },
        { provide: 'RedirectPagesService', useValue: fakeRedirectService },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListPathsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should exist an array of paths after init', () => {
    let fakeGoogleApiService = TestBed.inject(GoogleApiCommunicationService);
    let fakeRedirectService = TestBed.inject(RedirectPagesService);
    let serviceFake = {
      getPaths: () => {
        //create an IPathDTO array
        let paths: IPathDTO[] = [
          {
            "beginningWarehouseId": "A1",
            "endingWarehouseId": "A2",
            "energy": 100,
            "distance": 100,
            "time": 100,
            "chargingTime": 100
          },
          {
            "beginningWarehouseId": "A1",
            "endingWarehouseId": "A2",
            "energy": 100,
            "distance": 100,
            "time": 100,
            "chargingTime": 100
          }
        ];
        return Promise.resolve(paths);
      }


    } as GetPathsService;
    component = new ListPathsComponent(serviceFake, fakeGoogleApiService, fakeRedirectService);

    component.ngOnInit();

    //wait for the promise to resolve
    fixture.whenStable().then(() => {
      expect(component.paths).toBeTruthy();

      expect(component.paths.data.length).toBe(2);
    });

  });


  it('should works the back button', () => {
    component.goBack();
    expect(component).toBeTruthy();
  }
  );
});
