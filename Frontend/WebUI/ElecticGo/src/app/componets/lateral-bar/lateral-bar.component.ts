import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';

import { LateralBarDirection } from './lateral-bar-direction';
import { NavigationService } from 'src/app/services/navigation.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lateral-bar',
  templateUrl: './lateral-bar.component.html',
  styleUrls: ['./lateral-bar.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class LateralBarComponent implements OnInit {


  @Input() sidenavTemplateRef: any;
  @Input() duration: number = 0.25;
  @Input() navWidth: number = window.innerWidth;
  @Input() direction: LateralBarDirection = LateralBarDirection.Left;



  constructor(private navService: NavigationService) { }

  ngOnInit(): void {
   // this.showSideNav = this.navService.getShowNav();
  }
  onSidebarClose() {
    this.navService.setShowNav(false);
  }

  getSideNavBarStyle(showNav: boolean) {
    let navBarStyle: any = {};

    navBarStyle.transition = this.direction + ' ' + this.duration + 's, visibility ' + this.duration + 's';
    navBarStyle.width = this.navWidth + 'px';
    navBarStyle[this.direction] = (showNav ? 0 : (this.navWidth * -1)) + 'px';

    return navBarStyle;
  }

}
