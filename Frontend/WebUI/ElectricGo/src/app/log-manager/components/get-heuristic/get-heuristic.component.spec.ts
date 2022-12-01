import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetHeuristicComponent } from './get-heuristic.component';
import {HttpClient, HttpHandler} from "@angular/common/http";

describe('GetHeuristicComponent', () => {
  let component: GetHeuristicComponent;
  let fixture: ComponentFixture<GetHeuristicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetHeuristicComponent ],
      providers: [HttpClient,HttpHandler]
    })
      .compileComponents();

    fixture = TestBed.createComponent(GetHeuristicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
