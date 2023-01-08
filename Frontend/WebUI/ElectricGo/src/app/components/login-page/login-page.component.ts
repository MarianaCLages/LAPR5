import { Component, EventEmitter, NgZone, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleApiCommunicationService } from 'src/app/services/google-api-communication.service';
import { CredentialResponse, PromptMomentNotification } from 'google-one-tap';
import { FormBuilder } from '@angular/forms';
import { bool } from 'three/examples/jsm/nodes/Nodes';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent implements OnInit {
  username: any;
  password: any;

  @Output()
  loginEvent = new EventEmitter<string>();

  constructor(
    private router: Router,
    private service: GoogleApiCommunicationService,
    private _ngZone: NgZone,
    private fb: FormBuilder
  ) {}

  async ngOnInit() {
    this.isAuth();

    this.showLoginbutton();
  }

  private isAuth() {
    if (this.service.getJWT() === '') {
      console.log('No token found! Please login again!');
      return;
    }

    try {
      this.service.getRole().then((res: any) => {
        this._ngZone.run(
          () => {
            if (res.newUser == true) {
              const url = '/' + res.role + '/register';
              this.router.navigate([url]);
            } else {
              const url = '/' + res.role;
              this.router.navigate([url]);
            }
          },
          (err: any) => {
            console.log('Invalid token! Please login again!');
          }
        );
      });
    } catch (e) {}

    try {
      this.service
        .LoginWithGoogle(this.service.getJWT())
        .subscribe((res: any) => {
          this._ngZone.run(
            () => {
              if (res.newUser == true) {
                const url = '/' + res.role + '/register';
                this.router
                  .navigate([url])
              } else {
                const url = '/' + res.role;
                this.router
                  .navigate([url])
              }
            },
            (err: any) => {
              console.log('Invalid token! Please login again!');
            }
          );
        });
    } catch (e) {
      this.service.cleanCookies();
    }

    return;
  }

  private async showLoginbutton() {
    //@ts-ignore
    window.onGoogleLibraryLoad = () => {
      //@ts-ignore
      google.accounts.id.initialize({
        client_id:
          '388127332541-t853na1opdg7qomeg4juokdv4t9fukv0.apps.googleusercontent.com',
        callback: this.handleCredentialResponse.bind(this),
        auto_select: false,
        cancel_on_tap_outside: true,
      });

      //@ts-ignore
      google.accounts.id.renderButton(
        // @ts-ignore
        document.getElementById('googleButton'),
        { theme: 'outline', size: 'large', width: '100%', height: '100%' }
      );

      //@ts-ignore
      google.accounts.id.prompt((notification: PromptMomentNotification) => {});
    };
  }

  async handleCredentialResponse(credentialResponse: CredentialResponse) {
    try {
      await this.service
        .LoginWithGoogle(credentialResponse.credential)
        .subscribe((res: any) => {
          document.cookie = 'jwt=' + res.token;
          +';path=/';
          localStorage.setItem('token', res.token);
          this._ngZone.run(
            () => {
              if (res.newUser == true) {
                document.cookie = 'jwt=' + credentialResponse.credential;
                +';path=/';
                const url = '/' + res.role + '/register';
                this.router
                  .navigate([url])
              } else {
                const url = '/' + res.role;
                this.router
                  .navigate([url])
              }
            },
            (error: any) => {
              console.log('Invalid token! Please login again!');
            }
          );
        });
    } catch {}
  }

  public logout() {
    this.service.signOutExternal();
    this.service.cleanCookies();
    this._ngZone.run(() => {
      this.router.navigate(['/']);
    });
  }
}
