import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FleetManagerRoutingModule } from './fleet-manager-routing.module';
import { FleetManagerComponent } from './fleet-manager.component';
import {AppRoutingModule} from "../../app-routing.module";
import {AppModule} from "../../app.module";


@NgModule({
  declarations: [
    FleetManagerComponent
  ],
  imports: [
    CommonModule,
    FleetManagerRoutingModule,
    AppRoutingModule,
    AppModule
  ]
})
export class FleetManagerModule { }
