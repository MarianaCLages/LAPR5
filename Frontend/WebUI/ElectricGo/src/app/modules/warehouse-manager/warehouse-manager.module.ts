import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WarehouseManagerRoutingModule } from './warehouse-manager-routing.module';
import { WarehouseManagerComponent } from './warehouse-manager.component';
import {AppRoutingModule} from "../../app-routing.module";


@NgModule({
  declarations: [
    WarehouseManagerComponent
  ],
  imports: [
    CommonModule,
    WarehouseManagerRoutingModule,
    AppRoutingModule
  ]
})
export class WarehouseManagerModule {

}
