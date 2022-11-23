import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { AddTruckService } from '../../services/add-truck.service';

@Component({
  selector: 'app-add-truck',
  templateUrl: './add-truck.component.html',
  styleUrls: ['./add-truck.component.css'],
})
export class AddTruckComponent implements OnInit {
  caractTruck: any;
  truckPlate: any;
  tare: any;
  weightCapacity: any;
  totalBatCharge: any;
  cargaMax: any;
  chargingTime: any;
  res: any;

  @Output()
  redirectEvent = new EventEmitter<string>();

  constructor(
    private location: Location,
    private addTruckService: AddTruckService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.location.back();
  }

  addTruck() {
    let truck = {
      caractTruck: this.caractTruck,
      truckPlate: this.truckPlate,
      tare: this.tare,
      weightCapacity: this.weightCapacity,
      totalBatCharge: this.totalBatCharge,
      cargaMax: this.cargaMax,
      chargingTime: this.chargingTime
    };

    console.log(truck);
    this.res = this.addTruckService.addTruck(truck);
    console.log(this.res);

  }

}
