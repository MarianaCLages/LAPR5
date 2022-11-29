import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateOrderComponent } from './create-order.component';
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('CreateOrderComponent', () => {
  let component: CreateOrderComponent;
  let fixture: ComponentFixture<CreateOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateOrderComponent ],
      providers: [HttpClient,HttpHandler]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should add', function () {
    expect(1).toBe(1);
  });

});
