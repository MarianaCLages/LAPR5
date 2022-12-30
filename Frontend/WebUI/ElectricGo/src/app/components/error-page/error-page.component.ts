import { Component, OnInit } from '@angular/core';
import { GoogleApiCommunicationService } from 'src/app/services/google-api-communication.service';
import { RedirectPagesService } from 'src/app/services/redirect-pages.service';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {

  private role : string = '';

  constructor(private redirect: RedirectPagesService,
    private service: GoogleApiCommunicationService,) { }

  async ngOnInit(): Promise<void> {
    this.role = (await this.service.getRole()).role;
  }

  public homeButton() {
    this.redirect.homePage(this.role);
  }

}
