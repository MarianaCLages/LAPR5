import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AddPackagingComponent } from './log-manager/components/add-packaging/add-packaging.component';
import { AddPackagingService } from 'src/app/services/add-packaging.service';
import { AddTruckComponent } from "./fleet-manager/components/add-truck/add-truck.component";
import { AddWarehouseComponent } from "./warehouse-manager/components/add-warehouse/add-warehouse.component";
import { AddWarehouseService } from "./services/add-warehouse.service";
import { AppComponent } from './app.component';
import { AppConfigServiceService } from "./services/app-config-service.service";
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { CreateOrderComponent } from './warehouse-manager/components/create-order/create-order.component';
import { CreatePathComponent } from "./log-manager/components/create-path/create-path.component";
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { FleetManagerComponent } from "./fleet-manager/fleet-manager.component";
import { FleetSideBarComponent } from './fleet-manager/fleet-side-bar/fleet-side-bar.component';

import { GetAllWarehousesComponent } from "./warehouse-manager/components/get-all-warehouse/get-all-warehouses.component";
import { HeaderComponent } from './components/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { GetWarehouseComponent } from './warehouse-manager/components/get-warehouse/get-warehouse.component';
import { ListPackagingComponent } from './log-manager/components/list-packaging/list-packaging.component';
import { ListPathsComponent } from './log-manager/components/list-paths/list-paths.component';
import { LogManagerComponent } from "./log-manager/log-manager.component";
import { LogSideBarComponent } from './log-manager/components/log-side-bar/log-side-bar.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatListModule } from "@angular/material/list";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatSelectModule } from "@angular/material/select";
import { MatSelectSearchModule } from "mat-select-search";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatToolbarModule } from "@angular/material/toolbar";
import { ViewRoadMapNetworkComponent } from './log-manager/components/view-road-map-network/view-road-map-network.component';
import { WarehouseManagerComponent} from "./warehouse-manager/warehouse-manager.component";
import { WarehouseSideBarComponent } from "./warehouse-manager/components/warehouse-side-bar/warehouse-side-bar.component";
import { GetHeuristicComponent } from "./log-manager/components/get-heuristic/get-heuristic.component";
import { ListOrdersComponent } from './warehouse-manager/components/list-orders/list-orders.component';
import { ListTruckComponent } from './log-manager/components/list-truck/list-truck.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { ActivationWarehouseComponentComponent } from './warehouse-manager/components/activation-warehouse/activation-warehouse-component/activation-warehouse-component.component';
import { SoftDeleteTruckComponent } from './log-manager/components/soft-delete-truck/soft-delete-truck.component';
import {RegisterUserComponent} from "./admin/components/register-user/register-user.component";
import {AdminComponent} from "./admin/admin.component";
import {AdminSideBarComponent} from "./admin/components/admin-side-bar.component/admin-side-bar.component";
import {ListUsersComponent} from "./admin/components/list-users/list-users.component";
import {UserInfoComponent} from "./log-manager/components/user-info/user-info.component";


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
    ListUsersComponent,
    UserInfoComponent,
    AdminSideBarComponent,
    WarehouseSideBarComponent,
    GetAllWarehousesComponent,
    GetWarehouseComponent,
    GetHeuristicComponent,
    ListPathsComponent,
    ListOrdersComponent,
    ListTruckComponent,
    ActivationWarehouseComponentComponent,
    SoftDeleteTruckComponent,
    RegisterUserComponent,
    AdminComponent
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
    MatCheckboxModule,
    MatPaginatorModule,
  ],
  providers: [HttpClientModule, AddPackagingService,{
    provide: APP_INITIALIZER,
    multi: true,
    deps: [AppConfigServiceService],
    useFactory: (appConfigService: AppConfigServiceService) => {
      return () => {
        return appConfigService.loadAppConfig();
      };
    }
  }],
  exports: [
    HeaderComponent,
    LoginPageComponent,
    ErrorPageComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
