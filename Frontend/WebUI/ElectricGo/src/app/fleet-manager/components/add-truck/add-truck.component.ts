import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  error: boolean = false;
  errorMessage: any;
  res: any;

  @Output()
  redirectEvent = new EventEmitter<string>();

  constructor(
    private addTruckService: AddTruckService
  ) { }

  ngOnInit(): void {
  }

  addTruck() {
    let truck = {
      caractTruck: this.caractTruck,
      truckPlate: this.truckPlate,
      tare: this.tare,
      weightCapacity: this.weightCapacity,
      totalBatCharge: this.totalBatCharge,
      cargaMax: this.cargaMax,
      chargingTime: this.chargingTime,
      activeTruck: true
    };

    this.res = this.addTruckService.addTruck(truck);

    let errorOrSuccess: any = this.addTruckService.addTruck(truck);
    errorOrSuccess.subscribe(
      (data: any) => {
        this.goBack();
      },
      //transforms into an http error
      (error: any) => {
        this.error = true;
        if (error.status == 400) {
          this.errorMessage = error.error;
        }
        else {
          if (error.status == 500) {

            this.errorMessage = error.error.errors.message;
          }
          else {
            this.errorMessage = "An unknown error has ocurred";
          }
        }
      }
    );

  }

  goBack() {
    window.history.back();
  }

}
