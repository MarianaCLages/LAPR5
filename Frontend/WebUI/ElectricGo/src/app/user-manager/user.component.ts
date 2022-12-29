import {Component, NgZone, OnInit} from "@angular/core";
import {AddPackagingService} from "../services/add-packaging.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";
import { GoogleApiCommunicationService } from "../services/google-api-communication.service";


@Component({
  selector: 'app-user-manager',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [AddPackagingService]
})

export class UserComponent implements OnInit{

  constructor(private router: Router, private location: Location,
    private service: GoogleApiCommunicationService,
    private _ngZone: NgZone) { }

  ngOnInit(): void {
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
