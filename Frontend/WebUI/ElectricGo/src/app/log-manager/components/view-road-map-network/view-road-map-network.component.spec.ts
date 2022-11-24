import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRoadMapNetworkComponent } from './view-road-map-network.component';

describe('ViewRoadMapNetworkComponent', () => {
  let component: ViewRoadMapNetworkComponent;
  let fixture: ComponentFixture<ViewRoadMapNetworkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewRoadMapNetworkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewRoadMapNetworkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
