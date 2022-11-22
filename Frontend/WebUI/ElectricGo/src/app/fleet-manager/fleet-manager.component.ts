import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fleet-manager',
  templateUrl: './fleet-manager.component.html',
  styleUrls: ['./fleet-manager.component.css']
})
export class FleetManagerComponent implements OnInit {
  @Output()
  redirectEvent = new EventEmitter<string>();

  constructor(private router: Router, private location: Location) { }

  ngOnInit(): void {
  }

  addTruck() {
    //route to add truck menu
    let opt = 'addTruck';
    let url = 'FleetManager/' + opt;
    this.router.navigate([url]).then(r => console.log(r));
  }

  listTrucks() {
    //route to list trucks menu
    let opt = 'listTrucks';
    let url = 'FleetManager/' + opt;
    this.router.navigate([url]).then(r => console.log(r));
  }

  updateTruck() {
    //route to update truck menu
    let opt = 'updateTruck';
    let url = 'FleetManager/' + opt;
    this.router.navigate([url]).then(r => console.log(r));
  }

  logout() {
    this.location.back();
  }




}
