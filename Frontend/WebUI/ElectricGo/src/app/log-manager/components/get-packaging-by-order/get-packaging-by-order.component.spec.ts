import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetPackagingByOrderComponent } from './get-packaging-by-order.component';

describe('GetPackagingByOrderComponent', () => {
  let component: GetPackagingByOrderComponent;
  let fixture: ComponentFixture<GetPackagingByOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetPackagingByOrderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetPackagingByOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
