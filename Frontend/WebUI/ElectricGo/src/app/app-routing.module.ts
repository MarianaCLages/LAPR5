import {RouterModule, Routes} from '@angular/router';

import {ErrorPageComponent} from './components/error-page/error-page.component';
import {FleetManagerComponent} from './fleet-manager/fleet-manager.component';
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {NgModule} from '@angular/core';
import {WarehouseManagerComponent} from './warehouse-manager/warehouse-manager.component';
import {AdminComponent} from "./admin/admin.component";
import {LogManagerComponent} from "./log-manager/log-manager.component";

const routes: Routes = [
  {path: '', component: LoginPageComponent},

  {
    path: 'WarehouseManager',
    component: WarehouseManagerComponent
  },
  {
    path: 'FleetManager',
    component: FleetManagerComponent
  },
  {
    path: 'Admin',
    component: AdminComponent
  },
  {
    path: 'LogisticManager',
    component: LogManagerComponent
  },
  {path: '**', component: ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes), RouterModule.forRoot(routes)],
  declarations: [],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
