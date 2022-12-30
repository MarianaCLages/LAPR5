import {Component, EventEmitter, Output} from '@angular/core';
import { GoogleApiCommunicationService } from 'src/app/services/google-api-communication.service';
import { RedirectPagesService } from 'src/app/services/redirect-pages.service';
import {ActivationWarehouseService} from "../../../../services/activation-warehouse.service";
import {AddWarehouseService} from "../../../../services/add-warehouse.service";

@Component({
  selector: 'app-activation-warehouse-component',
  templateUrl: './activation-warehouse-component.component.html',
  styleUrls: ['./activation-warehouse-component.component.css'],
  providers: [ActivationWarehouseService]
})
export class ActivationWarehouseComponentComponent {


  alphaNumericId : any;
  errorMessage: any;
  successMessage: any;
  res: any;
  error: boolean = false;
  success: any;
  @Output()
  redirectEvent = new EventEmitter<string>();

  public showPage: boolean = false;

  public validRoles: string[] = ['WarehouseManager', 'Admin'];

  constructor(
    private activationWarehouseService: ActivationWarehouseService,
    private service: GoogleApiCommunicationService,
    private redirect: RedirectPagesService
  ) {}

  async ngOnInit(): Promise<void> {
    this.showPage = false;
    let boolValue = await this.service.isAuthenticated(this.validRoles);

    if (!boolValue.exists) {
      this.redirect.forbiddenPage();
    }

    if (!boolValue.valid) {
      this.redirect.lockedPage();
    }

    if (!boolValue.exists && !boolValue.valid) {
      this.redirect.logout();
    }

    this.showPage = true;
  }

  desactivateWarehouse() {


    //clears the error message
    this.errorMessage = "";
    this.error = false;

    //clears the success message
    this.success = "";

    let errorOrSuccess = this.activationWarehouseService.desactivateWarehouse(this.alphaNumericId);
    errorOrSuccess.subscribe((data: any) => {
        console.log(data);
        this.success = true;
        this.successMessage = "Warehouse Desactivated Successfully!";
        this.goBack();
      }, //transforms into a http error
      (error: any) => {
        this.error = true;
        if (error.status == 400) {
          this.errorMessage = error.error;
        } else {
          if (error.status == 500) {

            this.errorMessage = error.error.errors.message;
          } else {
            this.errorMessage = "An unknown error has ocurred";
          }
        }
      });

  }

  activateWarehouse(){

    //clears the error message
    this.errorMessage = "";
    this.error = false;

    //clears the success message
    this.success = "";

    let errorOrSuccess = this.activationWarehouseService.activateWarehouse(this.alphaNumericId);
    errorOrSuccess.subscribe((data: any) => {
        console.log(data);
        this.success = true;
        this.successMessage = "Warehouse Activated Successfully!";
        this.goBack();
      }, //transforms into a http error
      (error: any) => {
        this.error = true;
        if (error.status == 400) {
          this.errorMessage = error.error;
        } else {
          if (error.status == 500) {

            this.errorMessage = error.error.errors.message;
          } else {
            this.errorMessage = "An unknown error has ocurred";
          }
        }
      });
  }

  goBack() {
    window.history.back();
  }
}
