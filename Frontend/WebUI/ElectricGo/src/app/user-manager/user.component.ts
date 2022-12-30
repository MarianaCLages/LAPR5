import {Component, NgZone, OnInit} from "@angular/core";
import {AddPackagingService} from "../services/add-packaging.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import { GoogleApiCommunicationService } from "../services/google-api-communication.service";
import { RedirectPagesService } from "../services/redirect-pages.service";


@Component({
  selector: 'app-user-manager',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [AddPackagingService]
})

export class UserComponent implements OnInit{

  public showPage: boolean = false;
  private validRoles: string[] = ['User', 'Admin', 'LogisticManager','WarehouseManager', 'FleetManager'];

  constructor(private router: Router, private location: Location,
    private service: GoogleApiCommunicationService,
    private redirect: RedirectPagesService,
    private _ngZone: NgZone) { }

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

  goTo(destination: any) {
    //changes the route to the destination
    this.router.navigate([destination]).then(r => console.log(r));
  }

  public logout() {
    this.service.signOutExternal();
    this.service.cleanCookies();
    this._ngZone.run(() => {
      this.router.navigate(['/']).then((r) => window.location.reload());
    });
  }

}
