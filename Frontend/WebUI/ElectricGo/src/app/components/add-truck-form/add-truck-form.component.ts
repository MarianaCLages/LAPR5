import { Component, Inject, OnInit } from '@angular/core';

import { AddTruckServiceService } from 'src/app/services/add-truck-service.service';

@Component({
  selector: 'app-add-truck-form',
  templateUrl: './add-truck-form.component.html',
  styleUrls: ['./add-truck-form.component.css'],
  providers: [AddTruckServiceService]
})
export class AddTruckFormComponent implements OnInit {

  constructor(private addTruckService: AddTruckServiceService) { }

  ngOnInit(): void {
  }
  addTruck() {
    console.log("add truck");
    this.addTruckService.addTruck("any");
  }

}
