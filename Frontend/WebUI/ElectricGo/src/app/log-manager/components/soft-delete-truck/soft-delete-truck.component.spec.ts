import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftDeleteTruckComponent } from './soft-delete-truck.component';

describe('SoftDeleteTruckComponent', () => {
  let component: SoftDeleteTruckComponent;
  let fixture: ComponentFixture<SoftDeleteTruckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoftDeleteTruckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoftDeleteTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
