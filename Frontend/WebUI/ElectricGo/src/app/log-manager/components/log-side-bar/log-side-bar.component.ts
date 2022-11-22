import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from '@angular/core';
import {MediaMatcher} from "@angular/cdk/layout";

@Component({
  selector: 'app-log-side-bar',
  templateUrl: './log-side-bar.component.html',
  styleUrls: ['./log-side-bar.component.css']
})
export class LogSideBarComponent implements OnInit {

  @Output() menuSelected = new EventEmitter<string>();


  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
  }


  goToMenu(logisticManagerCreatePath: string) {
    this.menuSelected.emit(logisticManagerCreatePath);
  }
}
