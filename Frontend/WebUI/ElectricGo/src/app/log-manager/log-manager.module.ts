import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LogManagerRoutingModule} from './log-manager-routing.module';
import {LogManagerComponent} from './log-manager.component';
import { AddPackagingComponent } from './components/add-packaging/add-packaging.component';

import { HttpClientModule, HttpClient } from '@angular/common/http';

import {AppModule} from "../app.module";
import {AppRoutingModule} from "../app-routing.module";
import {FleetSideBarComponent} from './components/fleet-side-bar/fleet-side-bar.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatListModule} from "@angular/material/list";


@NgModule({
  declarations: [
    LogManagerComponent,
    AddPackagingComponent,

  ],
  imports: [ HttpClientModule,CommonModule, AppRoutingModule, AppModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule, MatListModule],
  exports: [
    LogManagerComponent, AddPackagingComponent,FleetSideBarComponent
  ]

})
export class LogManagerModule {
}
