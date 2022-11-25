import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AddPackagingComponent} from './log-manager/components/add-packaging/add-packaging.component';
import {AddPackagingService} from 'src/app/services/add-packaging.service';
import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {BrowserModule} from '@angular/platform-browser';
import {CreatePathComponent} from "./log-manager/components/create-path/create-path.component";
import {ErrorPageComponent} from './components/error-page/error-page.component';
import {HeaderComponent} from './components/header/header.component';
import {HttpClientModule} from '@angular/common/http';
import {LoginPageComponent} from './components/login-page/login-page.component';
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatListModule} from "@angular/material/list";
import {MatSelectModule} from "@angular/material/select";
import {MatSelectSearchModule} from "mat-select-search";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {NgModule} from '@angular/core';
import { FleetSideBarComponent } from './fleet-manager/fleet-side-bar/fleet-side-bar.component';
import {FleetManagerComponent} from "./fleet-manager/fleet-manager.component";
import { LogSideBarComponent } from './log-manager/components/log-side-bar/log-side-bar.component';
import {LogManagerComponent} from "./log-manager/log-manager.component";
import {AddWarehouseService} from "./services/add-warehouse.service";
import {WarehouseManagerComponent} from "./warehouse-manager/warehouse-manager.component";
import { AddTruckComponent } from "./fleet-manager/components/add-truck/add-truck.component";
import { AddWarehouseComponent } from "./warehouse-manager/components/add-warehouse/add-warehouse.component";
import { ListPackagingComponent } from './log-manager/components/list-packaging/list-packaging.component';
import { ViewRoadMapNetworkComponent } from './log-manager/components/view-road-map-network/view-road-map-network.component';
import { CreateOrderComponent } from './warehouse-manager/components/create-order/create-order.component';
import { WarehouseSideBarComponent } from "./warehouse-manager/components/warehouse-side-bar/warehouse-side-bar.component";
import { GetAllPackagingsComponent } from './log-manager/components/get-all-packagings/get-all-packagings.component';
import { GetPackagingByOrderComponent } from './log-manager/components/get-packaging-by-order/get-packaging-by-order.component';
import { GetPackagingByTruckComponent } from './log-manager/components/get-packaging-by-truck/get-packaging-by-truck.component';
import {GetAllWarehousesComponent} from "./warehouse-manager/components/get-all-warehouse/get-all-warehouses.component";
import { ListPathsComponent } from './log-manager/components/list-paths/list-paths.component';
import {MatTableModule} from "@angular/material/table";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    HeaderComponent,
    ErrorPageComponent,
    AddPackagingComponent,
    AddWarehouseComponent,
    CreatePathComponent,
    AddTruckComponent,
    FleetSideBarComponent,
    FleetManagerComponent,
    WarehouseManagerComponent,
    LogSideBarComponent,
    LogManagerComponent,
    ListPackagingComponent,
    ViewRoadMapNetworkComponent,
    CreateOrderComponent,
    WarehouseSideBarComponent,
    GetAllPackagingsComponent,
    GetAllWarehousesComponent,
    GetPackagingByOrderComponent,
    GetPackagingByTruckComponent,
    ListPathsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatInputModule,
    FormsModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatCardModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatSelectModule,
    MatSelectSearchModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
  ],
  providers: [HttpClientModule, AddPackagingService, AddWarehouseService],
  exports: [
    HeaderComponent,
    LoginPageComponent,
    ErrorPageComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
