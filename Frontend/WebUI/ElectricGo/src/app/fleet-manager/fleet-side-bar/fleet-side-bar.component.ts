import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MediaMatcher} from "@angular/cdk/layout";

@Component({
  selector: 'app-fleet-side-bar',
  templateUrl: './fleet-side-bar.component.html',
  styleUrls: ['./fleet-side-bar.component.css']
})
export class FleetSideBarComponent implements OnInit {

  @Output() menuSelected = new EventEmitter<string>();

  constructor() {
  }

  ngOnInit(): void {
  }

  goToMenu(selection: string) {
    this.menuSelected.emit(selection);
  }
}
