import {BrowserAnimationsModule, NoopAnimationsModule} from "@angular/platform-browser/animations";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

import {AddPackagingComponent} from './log-manager/components/add-packaging/add-packaging.component';
import {AddPackagingService} from 'src/app/services/add-packaging.service';
import {AddTruckFormComponent} from './components/add-truck-form/add-truck-form.component';
import {AddTruckServiceService} from './services/add-truck-service.service';
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

@NgModule({
  declarations: [
    AppComponent,
    AddTruckFormComponent,
    LoginPageComponent,
    HeaderComponent,
    ErrorPageComponent,
    AddPackagingComponent,
    CreatePathComponent,
    FleetSideBarComponent,
    FleetManagerComponent,
    LogSideBarComponent,
    LogManagerComponent
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
  ],
  providers: [HttpClientModule, AddTruckServiceService, AddPackagingService],
  exports: [
    HeaderComponent,
    AddTruckFormComponent,
    LoginPageComponent,
    ErrorPageComponent,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
