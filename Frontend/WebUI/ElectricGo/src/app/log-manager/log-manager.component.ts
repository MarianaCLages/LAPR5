import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { AddPackagingService } from '../services/add-packaging.service';
import { GoogleApiCommunicationService } from '../services/google-api-communication.service';
import { RedirectPagesService } from '../services/redirect-pages.service';

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
    private service: GoogleApiCommunicationService,
    private redirect: RedirectPagesService
     ) { }

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
      this.logout();
    }

    this.showPage = true;
  }

  public logout() {
    this.service.signOutExternal();
    this.service.cleanCookies();
    this.redirect.logout();
  }

  goTo(destination: any) {
    //changes the route to the destination
    this.router.navigate([destination]).then();
  }

}
