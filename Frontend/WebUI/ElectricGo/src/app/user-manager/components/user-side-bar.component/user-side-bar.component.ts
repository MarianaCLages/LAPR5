import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from "@angular/core";
import {MediaMatcher} from "@angular/cdk/layout";


@Component({
  selector: 'app-user-side-bar',
  templateUrl: 'user-side-bar.component.html',
  styleUrls: ['user-side-bar.component.css']
})

export class UserSideBarComponent implements OnInit{

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

  goToMenu2(logisticManagerListPath: string) {
    this.menuSelected.emit(logisticManagerListPath);
  }


}
