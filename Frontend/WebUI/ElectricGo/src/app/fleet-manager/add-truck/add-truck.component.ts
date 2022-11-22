import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { ITruckDTO } from 'src/app/shared/truckDTO';

@Component({
  selector: 'app-add-truck',
  templateUrl: './add-truck.component.html',
  styleUrls: ['./add-truck.component.css'],
})
export class AddTruckComponent implements OnInit {
  caractTruck: any;
  tare: any;
  weightCapacity: any;
  totalBatCharge: any;
  maxLoadAutonomy: any;
  chargingTime: any;
  res: any;

  @Output()
  redirectEvent = new EventEmitter<string>();

  constructor(
    private location: Location,
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.location.back();
  }

  addTruck() {
    let truck = {
      caractTruck: this.caractTruck,
      tare: this.tare,
      weightCapacity: this.weightCapacity,
      totalBatCharge: this.totalBatCharge,
      maxLoadAutonomy: this.maxLoadAutonomy,
      chargingTime: this.chargingTime
    };

    console.log(truck);

  }

}
