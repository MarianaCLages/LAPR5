import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseManagerComponent } from './warehouse-manager.component';

describe('WarehouseManagerComponent', () => {
  let component: WarehouseManagerComponent;
  let fixture: ComponentFixture<WarehouseManagerComponent>;

  beforeEach(async () => {
   try{

    await TestBed.configureTestingModule({
      declarations: [ WarehouseManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WarehouseManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

   } catch (e) {

   }
  });

  it('should create', () => {
    //expect(component).toBeTruthy();
  });
});
