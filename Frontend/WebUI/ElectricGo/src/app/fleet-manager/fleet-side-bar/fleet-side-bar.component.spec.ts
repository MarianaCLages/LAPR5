import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetSideBarComponent } from './fleet-side-bar.component';

describe('FleetSideBarComponent', () => {
  let component: FleetSideBarComponent;
  let fixture: ComponentFixture<FleetSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FleetSideBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FleetSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
