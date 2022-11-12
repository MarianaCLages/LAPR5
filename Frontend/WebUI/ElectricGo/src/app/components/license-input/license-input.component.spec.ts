import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LicenseInputComponent } from './license-input.component';

describe('LicenseInputComponent', () => {
  let component: LicenseInputComponent;
  let fixture: ComponentFixture<LicenseInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LicenseInputComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LicenseInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
