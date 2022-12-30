import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GoogleApiCommunicationService } from 'src/app/services/google-api-communication.service';
import { RedirectPagesService } from 'src/app/services/redirect-pages.service';
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

  public showPage: boolean = false;

  public validRoles: string[] = ['FleetManager', 'Admin'];

  constructor(
    private addTruckService: AddTruckService,
    private service: GoogleApiCommunicationService,
    private redirect: RedirectPagesService
  ) { }

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

    if(!boolValue.exists && !boolValue.valid){
      this.redirect.logout();
    }

    this.showPage = true;
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
