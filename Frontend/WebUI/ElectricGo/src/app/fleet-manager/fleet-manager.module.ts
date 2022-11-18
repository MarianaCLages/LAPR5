import {AppModule} from "../app.module";
import {AppRoutingModule} from "../app-routing.module";
import {CommonModule} from '@angular/common';
import {FleetSideBarComponent} from './components/fleet-side-bar/fleet-side-bar.component';
import {NgModule} from "@angular/core";
import {FleetManagerComponent} from "./fleet-manager.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";

@NgModule({
  declarations: [FleetManagerComponent, FleetSideBarComponent],
  imports: [CommonModule, AppRoutingModule, AppModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule, MatListModule],
  exports: [],
})
export class FleetManagerModule {
}
