import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRoadMapNetworkComponent } from './view-road-map-network.component';
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('ViewRoadMapNetworkComponent', () => {
  let component: ViewRoadMapNetworkComponent;
  let fixture: ComponentFixture<ViewRoadMapNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRoadMapNetworkComponent],
      providers: [HttpClient,HttpHandler]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRoadMapNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
