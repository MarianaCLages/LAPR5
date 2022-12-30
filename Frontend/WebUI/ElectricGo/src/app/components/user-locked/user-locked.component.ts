import { Component} from '@angular/core';
import { GoogleApiCommunicationService } from 'src/app/services/google-api-communication.service';
import { RedirectPagesService } from 'src/app/services/redirect-pages.service';

@Component({
  selector: 'app-user-locked',
  templateUrl: './user-locked.component.html',
  styleUrls: ['./user-locked.component.css']
})
export class UserLockedComponent {

  async ngOnInit(): Promise<void> {
  }

  constructor(
    private service: GoogleApiCommunicationService,
    private redirect: RedirectPagesService,
  ) {}

  public logout() {
    this.service.signOutExternal();
    this.service.cleanCookies();
    this.redirect.logout();
  }

}
