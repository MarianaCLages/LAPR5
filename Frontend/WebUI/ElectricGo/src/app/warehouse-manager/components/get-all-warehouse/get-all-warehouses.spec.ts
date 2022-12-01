import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllWarehousesComponent } from './get-all-warehouses.component';
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('GetAllWarehouseComponent', () => {
  let component: GetAllWarehousesComponent;
  let fixture: ComponentFixture<GetAllWarehousesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetAllWarehousesComponent ],
      providers: [HttpClient,HttpHandler]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GetAllWarehousesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
