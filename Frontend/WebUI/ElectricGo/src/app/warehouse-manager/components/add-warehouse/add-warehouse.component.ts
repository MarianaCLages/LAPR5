import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { AddWarehouseService } from 'src/app/services/add-warehouse.service';
import { ICreateWarehouseDTO } from 'src/app/shared/createWarehouseDTO';
import {CreatePathServiceService} from "../../../services/create-path-service.service";
import {GetWarehouseServiceService} from "../../../services/get-warehouse-service.service";
import { GoogleApiCommunicationService } from 'src/app/services/google-api-communication.service';
import { RedirectPagesService } from 'src/app/services/redirect-pages.service';

@Component({
  selector: 'app-add-warehouse',
  templateUrl: './add-warehouse.component.html',
  styleUrls: ['./add-warehouse.component.css'],
  providers: [AddWarehouseService],
})

export class  AddWarehouseComponent implements  OnInit{
  alphaNumericId : any;
  latitudeDegree : any;
  latitudeMinutes : any;
  latitudeSeconds : any;
  longitudeDegree: any;
  longitudeMinutes : any;
  longitudeSeconds: any;
  designation: any;
  street: any;
  doorNumber: any;
  postalCode: any;
  city: any;
  country: any;
  showRespose: boolean = false;
  warehouse: any;
  errorMessage: any;
  successMessage: any;
  res: any;
  error: boolean = false;
  success: any;
  @Output()
  redirectEvent = new EventEmitter<string>();

  public showPage: boolean = false;
  private validRoles: string[] = ['WarehouseManager', 'Admin'];

  constructor(
      private addWarehouseService: AddWarehouseService,
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


  addWarehouse(){

    //clears the error message
    this.errorMessage = "";
    this.error = false;

    //clears the success message
    this.success = "";


    let warehouseDTO: ICreateWarehouseDTO = {
      alphaNumId: this.alphaNumericId,
      latitudeDegree: this.latitudeDegree,
      latitudeSecond: this.latitudeSeconds,
      latitudeMinute: this.latitudeMinutes,
      longitudeSecond: this.longitudeSeconds,
      longitudeMinute: this.longitudeMinutes,
      longitudeDregree: this.longitudeDegree,
      designation: this.designation,
      street: this.street,
      doorNumber: this.doorNumber,
      postalCode: this.postalCode,
      city: this.city,
      country: this.country,
      activated: true
    };

    let errorOrSuccess: any = this.addWarehouseService.addWarehouse(warehouseDTO);
    errorOrSuccess.subscribe((data: any) => {
        console.log(data);
        this.success = true;
        this.successMessage = "Warehouse Created Successfully!";
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

    //Clears the form
    this.alphaNumericId = null;
    this.latitudeDegree = null;
    this.latitudeSeconds = null;
    this.latitudeMinutes = null;
    this.longitudeSeconds = null;
    this.longitudeMinutes = null;
    this.longitudeDegree = null;
    this.designation = null;
    this.street = null;
    this.doorNumber = null;
    this.postalCode = null;
    this.city = null;
    this.country = null;

  }

  goBack() {
    window.history.back();
  }
}
