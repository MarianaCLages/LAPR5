import {RouterModule, Routes} from '@angular/router';
import {FleetManagerComponent} from './fleet-manager/fleet-manager.component';
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {NgModule} from '@angular/core';
import {WarehouseManagerComponent} from './warehouse-manager/warehouse-manager.component';
import {LogManagerComponent} from "./log-manager/log-manager.component";
import {AddPackagingComponent} from './log-manager/components/add-packaging/add-packaging.component';
import {ErrorPageComponent} from "./components/error-page/error-page.component";
import {CreatePathComponent} from "./log-manager/components/create-path/create-path.component";

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
    path: 'LogisticManager',
    component: LogManagerComponent
  },

  {path: 'LogisticManager/addPackaging', component: AddPackagingComponent},
  {path: 'LogisticManager/createPath', component: CreatePathComponent},

  {path: '**', component: ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes), RouterModule.forRoot(routes)],
  declarations: [],
  exports: [RouterModule]
})

export class AppRoutingModule {
}
