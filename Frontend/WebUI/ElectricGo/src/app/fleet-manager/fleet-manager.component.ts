import { Component, NgZone, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import { Location } from '@angular/common';
import { GoogleApiCommunicationService } from '../services/google-api-communication.service';

@Component({
  selector: 'app-fleet-manager',
  templateUrl: './fleet-manager.component.html',
  styleUrls: ['./fleet-manager.component.css']
})
export class FleetManagerComponent implements OnInit {

  private validRoles: string[] = ['FleetManager', 'Admin'];

  constructor(private router: Router,
     private location: Location,
     private service: GoogleApiCommunicationService,
      private _ngZone: NgZone,
     ) { }

  ngOnInit(): void {
    let boolValue = this.service.isAuthenticated(this.validRoles);

    if(!boolValue){
     this.logout();
    }
  }

  addTruck() {
    //route to add truck menu
    let opt = 'addTruck';
    const url = 'FleetManager/' + opt;
    this.router.navigate([url]).then(r => console.log(r));
  }

  public logout() {
    this.service.signOutExternal();
    this.service.cleanCookies();
    this._ngZone.run(() => {
      this.router.navigate(['/']).then((r) => window.location.reload());
    });
  }

  goTo(destination: any) {
    //changes the route to the destination
    this.router.navigate([destination]).then(r => console.log(r));
  }
}

