import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { LateralBarComponent } from './componets/lateral-bar/lateral-bar.component';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [
    AppComponent,
    LateralBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
