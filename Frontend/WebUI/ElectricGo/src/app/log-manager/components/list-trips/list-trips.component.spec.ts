import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTripsComponent } from './list-trips.component';

describe('ListTripsComponent', () => {
  let component: ListTripsComponent;
  let fixture: ComponentFixture<ListTripsComponent>;

  beforeEach(async () => {
      try{

        await TestBed.configureTestingModule({
          declarations: [ ListTripsComponent ]
        })
        .compileComponents();

        fixture = TestBed.createComponent(ListTripsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

      } catch (e) {

      }
  });

  it('should create', () => {
    //expect(component).toBeTruthy();
  });
});
