import { Component, OnInit, ViewChild } from '@angular/core';

import IPathDTO from "../../../shared/pathDTO";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { GoogleApiCommunicationService } from 'src/app/services/google-api-communication.service';
import { RedirectPagesService } from 'src/app/services/redirect-pages.service';
import { BestPathForFleetService } from '../../services/best-path-for-fleet.service';
import ITripDTO from 'src/app/shared/tripDTO';

@Component({
  selector: 'app-list-trips',
  templateUrl: './list-trips.component.html',
  styleUrls: ['./list-trips.component.css']
})
export class ListTripsComponent implements OnInit {

  truckId: any;

  private validRoles: string[] = ['LogisticManager', 'Admin'];

  options: string[] = [
    'All Trips',
    'Trip by Truck',
  ];

  trips = new MatTableDataSource<ITripDTO>();
  displayedColumns: string[] = [];
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
  ) {
  }

  getTripsByFilter() {
    if(this.filterOption == "All Trips"){
      this.getTripsService.getAllTrips().then((data: any) => {
        this.trips.data = data;
      },
        (error: any) => {
          alert(error.error);
        });
    } else if (this.filterOption == "Trip by Truck") {
      this.getTripsService.getTripByTruck(this.truckId).then((data: any) => {
        this.trips.data = data;
      },
        (error: any) => {
          alert(error.error);
        });
    }

  }

  chooseFilter() {
    this.truckId = null;
    if (this.filterOption = 'All Trips') {
      this.getTripsService.getAllTrips().then((data: any) => {
        this.trips.data = data;
      });
    }
  }

  ngAfterViewInit() {
    this.trips.paginator = this.paginator;
    this.trips.sort = this.sort;
  }

  async ngOnInit() : Promise < void > {
    this.showPage = false
    let boolValue = await this.service.isAuthenticated(this.validRoles);

    if (!boolValue.exists) {
      //redirect to forbidden page
      this.redirect.forbiddenPage();
    }

    if (!boolValue.valid) {
      this.redirect.lockedPage();
    }

    if(!boolValue.exists && !boolValue.valid){
      this.redirect.logout();
    }

    this.showPage = true;
    this.getTripsService.getAllTrips().then((data: any) => {
      this.trips.data = data;
      this.trips.paginator = this.paginator;
      this.trips.sort = this.sort;
    }
    );
  }

  goBack() {
    window.history.back();
  }

}