import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivationWarehouseComponentComponent } from './activation-warehouse-component.component';

describe('ActivationWarehouseComponentComponent', () => {
  let component: ActivationWarehouseComponentComponent;
  let fixture: ComponentFixture<ActivationWarehouseComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActivationWarehouseComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActivationWarehouseComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
