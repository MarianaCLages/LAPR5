import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LogManagerComponent } from './log-manager.component';
import { AddPackagingComponent } from './components/add-packaging/add-packaging.component';
import {ErrorPageComponent} from '../components/error-page/error-page.component';


const routes: Routes = [
  { path: '', component: LogManagerComponent },
  { path: 'LogisticManager/addPackaging', component: AddPackagingComponent},
  {path: '**', component: ErrorPageComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes), RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class LogManagerRoutingModule { }
