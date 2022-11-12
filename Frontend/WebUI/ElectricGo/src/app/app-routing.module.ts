import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SideBarComponent} from "./components/side-bar/side-bar.component";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes), MatSidenavModule, MatListModule, MatToolbarModule, MatIconModule, MatButtonModule],
    declarations: [
        SideBarComponent
    ],
    exports: [RouterModule, SideBarComponent]
})
export class AppRoutingModule { }
