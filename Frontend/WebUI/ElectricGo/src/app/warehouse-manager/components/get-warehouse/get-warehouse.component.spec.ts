import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetWarehouseComponent } from './get-warehouse.component';
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('GetWarehouseComponent', () => {
  let component: GetWarehouseComponent;
  let fixture: ComponentFixture<GetWarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetWarehouseComponent ],
      providers: [HttpClient,HttpHandler]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GetWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
