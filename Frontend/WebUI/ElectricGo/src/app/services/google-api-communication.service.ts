import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserCredentialsDTO } from '../shared/userCredentialsDTO';

@Injectable({
  providedIn: 'root',
})
export class GoogleApiCommunicationService {
  private path = 'http://localhost:5000/api/User/loginWithGoogle';
  private getRolePath = 'http://localhost:5000/api/User/getUserRole';
  private getProfilePath = 'http://localhost:5000/api/User/getProfileInfo';

  constructor(private httpClient: HttpClient) {}

  public signOutExternal = () => {
    localStorage.removeItem('token');
  };

  public getJWT(): string {
    const cookies = document.cookie.split(';');

    let jwt = '';

    for (const cookie of cookies) {
      const [name, value] = cookie.split('=');
      if (name.trim() === 'jwt') {
        jwt = value;
        break;
      }
    }

    return jwt;
  }

  LoginWithGoogle(credential: string): Observable<any> {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(this.path, JSON.stringify(credential), {
      headers: header,
    });
  }

  public getRole(): any{
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(this.getRolePath,JSON.stringify(this.getJWT()), { headers: header, } ).toPromise();
  }

  public getProfileInfo(): any {
    const header = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.post(this.getProfilePath,JSON.stringify(this.getJWT()), { headers: header, } ).toPromise();
  }

  public async isAuthenticated(validRoles: string[]): Promise<boolean> {
    const jwt = this.getJWT();

    var exists = false;

    if (jwt === '') {
      return false;
    }

    await this.getRole().then((res: any) => {
      if (res !== null) {
        if (validRoles.includes(res.role)) {
          exists = true;
        }
      }
    }),
      (err: any) => {
        exists = false;
      };

    return exists;
  }

  public async newUserInfos(): Promise<IUserCredentialsDTO> {
    const jwt = this.getJWT();

    var user : IUserCredentialsDTO = {
      userName: "",
      role: "",
      email: "",
    };

    if (jwt === '') {
      return user;
    }

    await this.getRole().then((res: any) => {
      if (res !== null) {
        user.userName = res.userName;
        user.role = res.role;
        user.email = res.email;
      }
    }),
      (err: any) => {
        console.log(err);
      };

    return user;
  }


  public cleanCookies() {
    //Clear all cookies in the browser
    var cookies = document.cookie.split('; ');
    for (var c = 0; c < cookies.length; c++) {
      var d = window.location.hostname.split('.');
      while (d.length > 0) {
        var cookieBase =
          encodeURIComponent(cookies[c].split(';')[0].split('=')[0]) +
          '=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=' +
          d.join('.') +
          ' ;path=';
        var p = location.pathname.split('/');
        document.cookie = cookieBase + '/';
        while (p.length > 0) {
          document.cookie = cookieBase + p.join('/');
          p.pop();
        }
        d.shift();
      }
    }
  }
}
