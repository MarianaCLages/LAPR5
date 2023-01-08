import { Component, OnInit, ViewChild } from '@angular/core';

import { BestPathForFleetService } from '../../services/best-path-for-fleet.service';
import { GoogleApiCommunicationService } from 'src/app/services/google-api-communication.service';
import IPathDTO from '../../../shared/pathDTO';
import ITripDTO from 'src/app/shared/tripDTO';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { RedirectPagesService } from 'src/app/services/redirect-pages.service';

@Component({
  selector: 'app-list-trips',
  templateUrl: './list-trips.component.html',
  styleUrls: ['./list-trips.component.css'],
})
export class ListTripsComponent implements OnInit {
  truckId: any;
  errorMessage: any;
  error: boolean = false;

  private validRoles: string[] = ['LogisticManager', 'Admin'];

  options: string[] = ['All Trips', 'Trip by Truck'];

  trips = new MatTableDataSource<ITripDTO>();
  displayedColumns: string[] = [
    'Truck',
    'Day',
    'Warehouses',
    'Orders',
  ];
  // @ts-ignore
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  filterOption: any;

  public showPage: boolean = false;

  constructor(
    private getTripsService: BestPathForFleetService,
    private service: GoogleApiCommunicationService,
    private redirect: RedirectPagesService
  ) {}

  getTripsByFilter() {
    if (this.filterOption == 'All Trips') {
      this.getTripsService.getAllTrips().then(
        (data: any) => {
          this.trips.data = data;
        },
        (error: any) => {
          alert(error.error);
        }
      );
    } else if (this.filterOption == 'Trip by Truck') {
      this.getTripsService.getTripByTruck(this.truckId).then(
        (data: any) => {
          this.trips.data = data;
        },
        (error: any) => {
          this.error = true;
          if (error.status == 404) {
            this.errorMessage = error.error;
          } else {
            if (error.status == 500) {
              this.errorMessage = error.error.errors.message;
            } else {
              this.errorMessage = "Unknown error";
            }
          }
        }
      );
    }
  }

  chooseFilter() {
    this.truckId = null;
    console.log(this.filterOption);
    
  }

  ngAfterViewInit() {
    this.trips.paginator = this.paginator;
    this.trips.sort = this.sort;
  }

  async ngOnInit(): Promise<void> {
    this.showPage = false;
    let boolValue = await this.service.isAuthenticated(this.validRoles);

    if (!boolValue.exists) {
      //redirect to forbidden page
      this.redirect.forbiddenPage();
    }

    if (!boolValue.valid) {
      this.redirect.lockedPage();
    }

    if (!boolValue.exists && !boolValue.valid) {
      this.redirect.logout();
    }

    this.showPage = true;
    this.getTripsService.getAllTrips().then((data: any) => {
      console.log(data);
      this.trips.data = data;
      this.trips.paginator = this.paginator;
      this.trips.sort = this.sort;
    });
  }

  goBack() {
    window.history.back();
  }
}
