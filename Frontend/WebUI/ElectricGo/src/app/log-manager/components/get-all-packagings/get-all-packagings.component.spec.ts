import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetAllPackagingsComponent } from './get-all-packagings.component';

describe('GetAllPackagingsComponent', () => {
  let component: GetAllPackagingsComponent;
  let fixture: ComponentFixture<GetAllPackagingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetAllPackagingsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetAllPackagingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
