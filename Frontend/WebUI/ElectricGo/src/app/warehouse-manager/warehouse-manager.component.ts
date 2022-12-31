import {Component, NgZone, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import { AddWarehouseService } from '../services/add-warehouse.service'
import { CreateOrderService } from '../services/create-order.service';
import { GetOrdersService } from '../services/get-orders.service';
import { GoogleApiCommunicationService } from '../services/google-api-communication.service';
import { RedirectPagesService } from '../services/redirect-pages.service';

@Component({
  selector: 'app-warehouse-manager',
  templateUrl: './warehouse-manager.component.html',
  styleUrls: ['./warehouse-manager.component.css'],
  providers: [AddWarehouseService, CreateOrderService, GetOrdersService]
})
export class WarehouseManagerComponent implements OnInit {

  private validRoles: string[] = ['WarehouseManager', 'Admin'];

  public showPage : boolean = false;

  constructor(private router: Router,
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
    this.router.navigate([destination]).then();
  }

  public logout() {
    this.service.signOutExternal();
    this.service.cleanCookies();
    this._ngZone.run(() => {
      this.router.navigate(['/']).then((r) => window.location.reload());
    });
  }

}
