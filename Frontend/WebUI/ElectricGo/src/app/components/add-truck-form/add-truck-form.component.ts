import {Component, OnInit} from '@angular/core';

import {AddTruckServiceService} from 'src/app/services/add-truck-service.service';
import {ITruckDTO} from 'src/app/shared/truckDTO';

@Component({
  selector: 'app-add-truck-form',
  templateUrl: './add-truck-form.component.html',
  styleUrls: ['./add-truck-form.component.css'],
  providers: [AddTruckServiceService]
})
export class AddTruckFormComponent implements OnInit {
  trucksArr: ITruckDTO[] | undefined;


  constructor(private addTruckService: AddTruckServiceService) {
  }

  ngOnInit(): void {
  }

  addTruck() {
    console.log("add truck");
    const trucksres = this.addTruckService.addTruck("any");
    //add res to the array of trucks
    trucksres.subscribe(res => this.trucksArr = res);
  }

}
