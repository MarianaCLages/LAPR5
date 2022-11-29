import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPackagingComponent } from './list-packaging.component';
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('ListPackagingComponent', () => {
  let component: ListPackagingComponent;
  let fixture: ComponentFixture<ListPackagingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPackagingComponent ],
      providers: [HttpClient,HttpHandler]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPackagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
