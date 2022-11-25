import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPackagingByTruckComponent } from './get-packaging-by-truck.component';

describe('GetPackagingByTruckComponent', () => {
  let component: GetPackagingByTruckComponent;
  let fixture: ComponentFixture<GetPackagingByTruckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetPackagingByTruckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetPackagingByTruckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
