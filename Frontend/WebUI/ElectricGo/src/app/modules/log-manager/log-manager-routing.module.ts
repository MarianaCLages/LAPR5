import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogManagerComponent } from './log-manager.component';

const routes: Routes = [{ path: '', component: LogManagerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LogManagerRoutingModule { }
