import {RouterModule, Routes} from '@angular/router';

import {ErrorPageComponent} from './components/error-page/error-page.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {NgModule} from '@angular/core';
import {SideBarComponent} from "./shared/side-bar/side-bar.component";
import {LoginPageComponent} from "./components/login-page/login-page.component";

const routes: Routes = [
  {path: '', component: LoginPageComponent},
  {
    path: 'WarehouseManager',
    loadChildren: () => import('./modules/warehouse-manager/warehouse-manager.module').then(m => m.WarehouseManagerModule)
  },
  {
    path: 'FleetManager',
    loadChildren: () => import('./modules/fleet-manager/fleet-manager.module').then(m => m.FleetManagerModule)
  },
  {path: 'Admin', loadChildren: () => import('./modules/admin/admin.module').then(m => m.AdminModule)},
  {
    path: 'LogisticManager',
    loadChildren: () => import('./modules/log-manager/log-manager.module').then(m => m.LogManagerModule)
  },
  {path: '**', component: ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes), RouterModule.forRoot(routes), MatSidenavModule, MatListModule, MatToolbarModule, MatIconModule, MatButtonModule],
  declarations: [
    SideBarComponent],
  exports: [RouterModule, SideBarComponent]
})

export class AppRoutingModule {
}
