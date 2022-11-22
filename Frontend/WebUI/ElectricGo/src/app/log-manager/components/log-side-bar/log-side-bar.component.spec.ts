import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogSideBarComponent } from './log-side-bar.component';

describe('LogSideBarComponent', () => {
  let component: LogSideBarComponent;
  let fixture: ComponentFixture<LogSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogSideBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
