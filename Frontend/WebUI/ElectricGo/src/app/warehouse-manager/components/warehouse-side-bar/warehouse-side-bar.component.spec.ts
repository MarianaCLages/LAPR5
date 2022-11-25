import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseSideBarComponent } from './warehouse-side-bar.component';

describe('WarehouseSideBarComponent', () => {
  let component: WarehouseSideBarComponent;
  let fixture: ComponentFixture<WarehouseSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WarehouseSideBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
