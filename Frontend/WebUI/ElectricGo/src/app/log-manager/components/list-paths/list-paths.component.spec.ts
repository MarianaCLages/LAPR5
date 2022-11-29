import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPathsComponent } from './list-paths.component';
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('ListPathsComponent', () => {
  let component: ListPathsComponent;
  let fixture: ComponentFixture<ListPathsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPathsComponent ],
      providers: [HttpClient,HttpHandler]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPathsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
