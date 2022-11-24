import { MediaMatcher } from "@angular/cdk/layout";
import {ChangeDetectorRef, Component, EventEmitter, OnInit, Output} from "@angular/core";

@Component({
  selector: 'app-warehouse-side-bar',
  templateUrl: './warehouse-side-bar.component.html',
  styleUrls: ['./warehouse-side-bar.component.css']
})
export class WarehouseSideBarComponent implements OnInit {

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

  goToMenu(warehouseManagerMenu: string) {
    this.menuSelected.emit(warehouseManagerMenu);
  }
}
