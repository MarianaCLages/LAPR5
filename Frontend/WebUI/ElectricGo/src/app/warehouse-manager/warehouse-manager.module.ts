import {AppRoutingModule} from "../app-routing.module";
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {WarehouseManagerComponent} from './warehouse-manager.component';
import {WarehouseManagerRoutingModule} from './warehouse-manager-routing.module';
import {AppModule} from "../app.module";


@NgModule({
  declarations: [
    WarehouseManagerComponent
  ],
  imports: [
    CommonModule,
    WarehouseManagerRoutingModule,
    AppRoutingModule,
    AppModule
  ],
  exports: [
    WarehouseManagerComponent]
})
export class WarehouseManagerModule {

}
