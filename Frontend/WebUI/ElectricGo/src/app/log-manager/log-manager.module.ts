import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {LogManagerRoutingModule} from './log-manager-routing.module';
import {LogManagerComponent} from './log-manager.component';


@NgModule({
  declarations: [
    LogManagerComponent,

  ],
  imports: [
    CommonModule,
    LogManagerRoutingModule,

  ],
  exports: [
    LogManagerComponent,

  ]
})
export class LogManagerModule {
}
