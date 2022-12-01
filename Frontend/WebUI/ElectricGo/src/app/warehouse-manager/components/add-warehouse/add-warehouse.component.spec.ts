import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddWarehouseComponent } from './add-warehouse.component';
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('AddWarehouseComponent', () => {
  let component: AddWarehouseComponent;
  let fixture: ComponentFixture<AddWarehouseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddWarehouseComponent ],
      providers: [HttpClient,HttpHandler]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AddWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should add', function () {
    expect(1).toBe(1);
  });

});
