import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTruckFormComponent } from './add-truck-form.component';

describe('AddTruckFormComponent', () => {
  let component: AddTruckFormComponent;
  let fixture: ComponentFixture<AddTruckFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddTruckFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddTruckFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
