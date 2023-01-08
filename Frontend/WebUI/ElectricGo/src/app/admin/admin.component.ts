import {Component, NgZone, OnInit} from "@angular/core";
import {AddPackagingService} from "../services/add-packaging.service";
import {Router} from "@angular/router";
import { GoogleApiCommunicationService } from "../services/google-api-communication.service";
import { RedirectPagesService } from "../services/redirect-pages.service";


@Component({
  selector: 'app-admin-manager',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [AddPackagingService]
})

export class AdminComponent implements OnInit{

  private validRoles: string[] = ['Admin'];
  public showPage : boolean = false;

  constructor(private router: Router,
    private service: GoogleApiCommunicationService,
    private redirect: RedirectPagesService,
    private _ngZone: NgZone) { }

  async ngOnInit(): Promise<void> {
    this.showPage = false;

    let boolValue = await this.service.isAuthenticated(this.validRoles);

    if (!boolValue.exists) {
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

  goTo(destination: any) {
    //changes the route to the destination
    this.router.navigate([destination]).then();
  }

  public logout() {
    this.service.signOutExternal();
    this.service.cleanCookies();
    this._ngZone.run(() => {
      this.router.navigate(['/'])
    });
  }

}
