import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetManagerComponent } from './fleet-manager.component';

describe('FleetManagerComponent', () => {
  let component: FleetManagerComponent;
  let fixture: ComponentFixture<FleetManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FleetManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FleetManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
