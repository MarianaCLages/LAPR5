import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTruckComponent } from './list-truck.component';
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('ListTruckComponent', () => {
  let component: ListTruckComponent;
  let fixture: ComponentFixture<ListTruckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTruckComponent ],
      providers: [HttpClient,HttpHandler]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
