import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-fleet-manager',
  templateUrl: './fleet-manager.component.html',
  styleUrls: ['./fleet-manager.component.css']
})
export class FleetManagerComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goTo(destination: any) {
    //changes the route to the destination
    this.router.navigate([destination]).then(r => console.log(r));
  }
}

