import {Component,  NgZone,  OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { Location } from '@angular/common';
import { AddPackagingService } from '../services/add-packaging.service';
import {GUI} from 'dat.gui';
import { GoogleApiCommunicationService } from '../services/google-api-communication.service';

@Component({
  selector: 'app-log-manager',
  templateUrl: './log-manager.component.html',
  styleUrls: ['./log-manager.component.css'],
  providers: [AddPackagingService]
})
export class LogManagerComponent implements OnInit {

  private validRoles: string[] = ['LogisticManager', 'Admin'];
  public showPage : boolean = false;

  constructor(private router: Router,
     private location: Location,
     private service: GoogleApiCommunicationService,
     private _ngZone: NgZone
     ) { }

  async ngOnInit(): Promise<void> {
    this.showPage = false;

    let boolValue = await this.service.isAuthenticated(this.validRoles);

    if(!boolValue){
      console.log("Not authenticated")
      this.logout();
    } else {
      this.showPage = true;
    }
  }



  addPackaging() {
    //route to add packaging menu
    let opt = 'addPackaging';
/*
    this.redirectEvent.emit(opt);
*/
    const url = 'LogisticManager/' + opt;
    this.router.navigate([url]).then(r => console.log(r));
  }

  listPackagings() {
    //route to list Packagings menu
    let opt = 'createPath';
    // this.redirectEvent.emit(opt);
    const url = 'LogisticManager/' + opt;
    this.router.navigate([url]).then(r => console.log(r));
  }

  updatePackaging() {
    //route to update Packaging menu
    let opt = 'updatePackaging';
    // this.redirectEvent.emit(opt);
    const url = 'LogisticManager/' + opt;
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
