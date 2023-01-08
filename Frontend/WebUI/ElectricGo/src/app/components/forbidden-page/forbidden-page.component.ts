import { Component, NgZone } from '@angular/core';
import { Router} from '@angular/router';
import { GoogleApiCommunicationService } from 'src/app/services/google-api-communication.service';

@Component({
  selector: 'app-forbidden-page',
  templateUrl: './forbidden-page.component.html',
  styleUrls: ['./forbidden-page.component.css'],
})
export class ForbiddenPageComponent {
  private role: string = '';

  constructor(
    private router: Router,
    private service: GoogleApiCommunicationService,
    private _ngZone: NgZone
  ) {}

  async ngOnInit(): Promise<void> {
    this.role = '';
    let boolValue = await this.service.getProfileInfo();

    this.role = boolValue.role;
  }

  public homePage() {
    this._ngZone.run(() => {
      this.router.navigate(['/' + this.role]);
    });
  }
}
