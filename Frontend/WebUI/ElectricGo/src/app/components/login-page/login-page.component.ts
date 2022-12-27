import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  username: any;
  password: any;
  @Output()
  loginEvent = new EventEmitter<string>();

  constructor(private router: Router) {
  }

  ngOnInit(): void {

  }

  login() {
    //route to home page
    this.loginEvent.emit(this.username);
    const url = '/' + this.username;
    this.router.navigate([url]).then(r => console.log(r));
  }



}
