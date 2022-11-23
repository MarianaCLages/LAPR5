import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListPackagingComponent } from './list-packaging.component';

describe('ListPackagingComponent', () => {
  let component: ListPackagingComponent;
  let fixture: ComponentFixture<ListPackagingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListPackagingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListPackagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
