import { RouterModule, Routes } from '@angular/router';
import { FleetManagerComponent } from './fleet-manager/fleet-manager.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { NgModule } from '@angular/core';
import { WarehouseManagerComponent } from './warehouse-manager/warehouse-manager.component';
import { LogManagerComponent } from './log-manager/log-manager.component';
import { AddPackagingComponent } from './log-manager/components/add-packaging/add-packaging.component';
import { ViewRoadMapNetworkComponent } from './log-manager/components/view-road-map-network/view-road-map-network.component';
import { ErrorPageComponent } from './components/error-page/error-page.component';
import { CreatePathComponent } from './log-manager/components/create-path/create-path.component';
import { AddTruckComponent } from './fleet-manager/components/add-truck/add-truck.component';
import { AddWarehouseComponent } from "./warehouse-manager/components/add-warehouse/add-warehouse.component";
import { ListPackagingComponent } from './log-manager/components/list-packaging/list-packaging.component';
import { CreateOrderComponent } from './warehouse-manager/components/create-order/create-order.component';
import { GetAllWarehousesComponent } from "./warehouse-manager/components/get-all-warehouse/get-all-warehouses.component";
import { GetWarehouseComponent } from "./warehouse-manager/components/get-warehouse/get-warehouse.component";
import { GetHeuristicComponent } from "./log-manager/components/get-heuristic/get-heuristic.component";
import { ListPathsComponent } from './log-manager/components/list-paths/list-paths.component';
import { ListOrdersComponent } from './warehouse-manager/components/list-orders/list-orders.component';
import { ListTruckComponent } from './log-manager/components/list-truck/list-truck.component';
import {ActivationWarehouseComponentComponent} from "./warehouse-manager/components/activation-warehouse/activation-warehouse-component/activation-warehouse-component.component";
import { SoftDeleteTruckComponent } from './log-manager/components/soft-delete-truck/soft-delete-truck.component';
import {RegisterUserComponent} from "./admin/components/register-user/register-user.component";
import {AdminComponent} from "./admin/admin.component";
import {ListUsersComponent} from "./admin/components/list-users/list-users.component";

const routes: Routes = [
  // Login
  { path: '', component: LoginPageComponent },

  // Warehouse Manager
  {path: 'WarehouseManager', component: WarehouseManagerComponent},
  {path: 'WarehouseManager/addWarehouse', component: AddWarehouseComponent},
  {path: 'WarehouseManager/createOrder', component: CreateOrderComponent},
  {path: 'WarehouseManager/listOrders', component: ListOrdersComponent},
  {path: 'WarehouseManager/activationWarehouse', component: ActivationWarehouseComponentComponent},

  // Fleet Manager
  {path: 'FleetManager', component: FleetManagerComponent},
  {path: 'FleetManager/addTruck', component: AddTruckComponent},


  //Admin
  {path: 'Admin',component: AdminComponent},
  {path: 'Admin/registerUser', component: RegisterUserComponent},
  {path: 'Admin/listUser',component : ListUsersComponent},

  // Logistic Manager
  {path: 'LogisticManager', component: LogManagerComponent},
  {path: 'LogisticManager/addPackaging', component: AddPackagingComponent},
  {path: 'LogisticManager/createPath', component: CreatePathComponent},
  {path: 'LogisticManager/listPackaging', component: ListPackagingComponent},
  {path: 'WarehouseManager/getWarehouse', component: GetWarehouseComponent},
  {path: 'WarehouseManager/getAllWarehouse', component: GetAllWarehousesComponent},
  {path: 'LogisticManager/viewNetwork', component: ViewRoadMapNetworkComponent},
  {path: 'LogisticManager/listPath', component: ListPathsComponent},
  {path: 'LogisticManager/listTrucks', component: ListTruckComponent},
  {path: 'LogisticManager/getHeuristic',component:GetHeuristicComponent},
  {path: 'LogisticManager/softDeleteTruck', component: SoftDeleteTruckComponent},

  // Error Page
  {path: '**', component: ErrorPageComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes), RouterModule.forRoot(routes)],
  declarations: [],
  exports: [RouterModule],
})
export class AppRoutingModule {}
