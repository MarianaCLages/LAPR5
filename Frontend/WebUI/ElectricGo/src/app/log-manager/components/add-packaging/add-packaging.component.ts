import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { AddPackagingService } from 'src/app/services/add-packaging.service';
import { ICreatePackagingDTO } from 'src/app/shared/createPackagingDTO';
import { IPackagingDTO } from 'src/app/shared/packagingDTO';

@Component({
  selector: 'app-add-packaging',
  templateUrl: './add-packaging.component.html',
  styleUrls: ['./add-packaging.component.css'],
  providers: [AddPackagingService],
})
export class AddPackagingComponent implements OnInit {
  orderReference: any;
  truckReference: any;
  showResponse: boolean = false;
  truck: any;
  res: any;
  @Output()
  redirectEvent = new EventEmitter<string>();

  constructor(
    private location: Location,
    private addPackagingService: AddPackagingService
  ) {}

  ngOnInit(): void {}

  logout() {
    this.location.back();
  }

  addPackaging() {
    let pack = {
      orderRef: this.orderReference,
      truckRef: this.truckReference,
    };

    console.log(pack);
    this.res = this.addPackagingService.addPackaging(
      pack as ICreatePackagingDTO
    );

    console.log(this.res.status);
    console.log('a' + this.res.body);

    if (this.res.status == 201) {
      this.showResponse = true;
    } else this.showResponse = false;

    console.log(this.showResponse);
  }
}
