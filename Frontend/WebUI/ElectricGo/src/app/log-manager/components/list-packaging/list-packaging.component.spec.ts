import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPackagingComponent } from './list-packaging.component';
import {HttpClient, HttpHandler} from "@angular/common/http";
import { IPackagingDTO } from 'src/app/shared/packagingDTO';
import { ListPackagingService } from '../../services/list-packaging.service';
import { GoogleApiCommunicationService } from 'src/app/services/google-api-communication.service';
import { RedirectPagesService } from 'src/app/services/redirect-pages.service';

describe('ListPackagingComponent', () => {
  let component: ListPackagingComponent;
  let fixture: ComponentFixture<ListPackagingComponent>;

  beforeEach(async () => {

    const listPackagingServiceFake = jasmine.createSpyObj('ListPackagingService', ['getPackaging']);
    let fakeGoogleApiService =  jasmine.createSpyObj('GoogleApiCommunicationService',['']);
    let fakeRedirectService = jasmine.createSpyObj('RedirectPagesService',['']);
    listPackagingServiceFake.getPackaging.and.returnValue(Promise.resolve(
      [
        {
          "orderRef": "A1/1",
          "truckRef": "AA-77-BB",
          "posX": 5,
          "posY": 1,
          "posZ": 1,
        },
      ],
    ));
    await TestBed.configureTestingModule({
      declarations: [ ListPackagingComponent ],
      providers: [
        HttpClient,
        HttpHandler,
        { provide: 'GetPackagingService', useValue: listPackagingServiceFake },
        { provide: 'GoogleApiCommunicationService', useValue: fakeGoogleApiService },
        { provide: 'RedirectPagesService', useValue: fakeRedirectService },
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ListPackagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should exist an array of packaging after init', () => {
    let fakeGoogleApiService = TestBed.inject(GoogleApiCommunicationService);
    let fakeRedirectService = TestBed.inject(RedirectPagesService);
    let serviceFake = {
      getPackaging: () => {
        //create an IPathDTO array
        let packaging: IPackagingDTO[] = [
          {
            "orderRef": "A1/2",
            "truckRef": "AA-55-CC",
            "pos3DX": 5,
            "pos3DY": 1,
            "pos3DZ": 1,
          },
        ];
        return Promise.resolve(packaging);
      }

    } as ListPackagingService;
    component = new ListPackagingComponent(serviceFake, fakeGoogleApiService, fakeRedirectService);
    component.ngOnInit();

    fixture.whenStable().then(() => {
      expect(component.packagings).toBeTruthy();

    });
  });

  it('should work the back button', () => {
    component.goBack();
    expect(component).toBeTruthy();
  });

});
