import { Component, OnInit } from '@angular/core';
import { AddPackagingService } from 'src/app/services/add-packaging.service';
import { IPackagingDTO } from 'src/app/shared/packagingDTO';
import { GetTrucksService } from 'src/app/services/get-trucks.service';
import { GetOrdersService } from 'src/app/services/get-orders.service';
import { GoogleApiCommunicationService } from 'src/app/services/google-api-communication.service';
import { RedirectPagesService } from 'src/app/services/redirect-pages.service';

@Component({
  selector: 'app-add-packaging',
  templateUrl: './add-packaging.component.html',
  styleUrls: ['./add-packaging.component.css']
})

export class AddPackagingComponent implements OnInit {
  orderRef: any;
  truckRef: any;
  posX: any;
  posY: any;
  posZ: any;

  orders: any[] = [];
  trucks: any[] = [];

  errorMessage: any;
  error: boolean = false;
  success: any;
  successMessage: any;

  public showPage: boolean = false;

  public validRoles: string[] = ['Admin', 'LogisticManager'];

  constructor(
    private addPackagingService: AddPackagingService,
    private getTrucksService: GetTrucksService,
    private service: GoogleApiCommunicationService,
    private redirect: RedirectPagesService,
    private getOrdersService: GetOrdersService
  ) {}

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

    //gets the orders from the backend
    this.getOrdersService.getOrders().then((data: any) => {
      this.orders = data;
    });
    this.error = false;

    //gets the trucks from the backend
    this.getTrucksService.getTrucks().then((data: any) => {
      this.trucks = data;
    });
    this.error = false;
  }

  addPackaging() {
    //clears the error message
    this.errorMessage = "";
    this.error = false;

    //clears the success message
    this.success = "";

    //creates the packaging DTO
    let packagingDTO: IPackagingDTO = {
      orderRef: this.orderRef.identifier,
      truckRef: this.truckRef.caractTruck,
      pos3DX: this.posX,
      pos3DY: this.posY,
      pos3DZ: this.posZ
    };

    //clears the form
    this.orderRef = null;
    this.truckRef = null;
    this.posX = null;
    this.posY = null;
    this.posZ = null;

    //send the packaging DTO to the backend
    let errorOrSuccess: any = this.addPackagingService.addPackaging(packagingDTO);
    errorOrSuccess.subscribe(
      (data: any) => {
        this.success = true;
        this.successMessage = "Packaging added successfully";
        this.goBack();
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
            this.errorMessage = "An unknown error has occurred!";
          }
        }
      }
    );
  }

  goBack() {
    window.history.back();
  }
}
