import { Component, OnInit, ViewChild } from '@angular/core';
import { GetTrucksService } from '../../../services/get-trucks.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { ITruckDTO } from '../../../shared/truckDTO';

@Component({
  selector: 'app-list-truck',
  templateUrl: './list-truck.component.html',
  styleUrls: ['./list-truck.component.css']
})

export class ListTruckComponent implements OnInit {
  truckPlateRef: any;
  truckCaractRef: any;
  filterOption: any;
  dualFilter: any;
  errorMessage: any;
  error: boolean = false;
  options: string[] = [
    'Truck plate',
    'Truck characteristic',
    'All Trucks',
  ];

  trucks = new MatTableDataSource<ITruckDTO>();
  displayedColumns: string[] = [
    'Truck characteristic',
    'Truck Plate',
    'Weight Capacity',
    'Max Weight Capacity',
    'Max Battery',
    'Tare',
    'Charging Time',
  ];

  // @ts-ignore
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  allComplete: boolean = false;

  constructor(
    private getTrucksService: GetTrucksService
  ) {}

  ngAfterViewInit() {
    // @ts-ignore
    this.trucks.paginator = this.paginator;
  }

  async ngOnInit(): Promise<void> {
    this.getTrucksService.getTrucks().then((data: any) => {
      this.trucks.data = data;
    });
  }

  chooseFilter() {
    //CLEAR THE FORM
    this.truckCaractRef = null;
    this.truckPlateRef = null;

    if (this.filterOption == 'All Trucks') {
      this.getTrucksByFilter();
    }
  }

  getTrucksByFilter() {
    //RESET THE VALUES
    this.errorMessage = '';
    this.error = false;

    if (this.filterOption == 'Truck plate') {
      this.getTrucksService.getTrucksByPlate(this.truckPlateRef).then(
        (data: any) => {
          this.trucks.data = data;
        },
        //transforms into a http error
        (error: any) => {
          this.error = true;
          if (error.status == 400) {
            this.errorMessage = error.error;
          } else {
            if (error.status == 500) {
              this.errorMessage = error.error.errors.message;
            } else {
              this.errorMessage = 'Unknown error!';
            }
          }
        }
      );
    } else if (this.filterOption == 'Truck characteristic') {
      this.getTrucksService.getTrucksByCaract(this.truckCaractRef).then(
        (data: any) => {
          this.trucks.data = data;
        },
        //transforms into a http error
        (error: any) => {
          this.error = true;
          if (error.status == 400) {
            this.errorMessage = error.error;
          } else {
            if (error.status == 500) {
              this.errorMessage = error.error.errors.message;
            } else {
              this.errorMessage = 'Unknown error!';
            }
          }
        }
      );
    } else if (this.filterOption == 'All Trucks') {
      this.getTrucksService.getTrucks().then(
        (data: any) => {
          this.trucks.data = data;
        },
        //transforms into a http error
        (error: any) => {
          this.error = true;
          if (error.status == 400) {
            this.errorMessage = error.error;
          } else {
            if (error.status == 500) {
              this.errorMessage = error.error.errors.message;
            } else {
              this.errorMessage = 'Unknown error!';
            }
          }
        }
      );
    }
    this.trucks.paginator = this.paginator;
  }

  goBack() {
    window.history.back();
  }
}
