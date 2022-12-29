import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterUserAsUserComponent } from './register-user-as-user.component';

describe('RegisterUserAsUserComponent', () => {
  let component: RegisterUserAsUserComponent;
  let fixture: ComponentFixture<RegisterUserAsUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegisterUserAsUserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterUserAsUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
