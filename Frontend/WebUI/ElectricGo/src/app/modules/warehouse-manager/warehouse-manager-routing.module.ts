import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WarehouseManagerComponent } from './warehouse-manager.component';

const routes: Routes = [{ path: '', component: WarehouseManagerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WarehouseManagerRoutingModule { }
