import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { AddWarehouseService } from 'src/app/services/add-warehouse.service';
import { ICreateWarehouseDTO } from 'src/app/shared/createWarehouseDTO';

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
  res: any;
  @Output()
  redirectEvent = new EventEmitter<string>();

  constructor(
      private location: Location,
      private addWarehouseService: AddWarehouseService
  ) {}

  ngOnInit(): void {}

  logout() {
    this.location.back();
  }

  addWarehouse(){
    let warehouse = {
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
      country: this.country
    };

    console.log(warehouse);
    this.res = this.addWarehouseService.addWarehouse(
      warehouse as ICreateWarehouseDTO
    );

    console.log(this.res.status);
    console.log('a' + this.res.body);

    console.log(this.showRespose);
  }
}
