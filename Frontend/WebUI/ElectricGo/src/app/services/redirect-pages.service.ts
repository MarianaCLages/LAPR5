import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RedirectPagesService {
  constructor(private router: Router, private _ngZone: NgZone) {}

  public forbiddenPage() {
    this._ngZone.run(() => {
      this.router.navigate(['/forbidden']) ;
    });
  }

  public lockedPage() {
    this._ngZone.run(() => {
      this.router.navigate(['/locked']);
    });
  }

  public logout() {
    this._ngZone.run(() => {
      this.router.navigate(['/']);
    });
  }

  public homePage(role: string) {
    this._ngZone.run(() => {
      this.router.navigate(['/' + role]);
    });
  }
}
