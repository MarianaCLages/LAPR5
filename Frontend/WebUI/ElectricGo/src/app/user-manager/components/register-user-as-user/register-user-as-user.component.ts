

import {Component, OnInit} from "@angular/core";
import {ICreateUserDTO} from "../../../shared/createUserDTO";
import {RegisterUserService} from "../../../admin/services/register-user.service";
import { GoogleApiCommunicationService } from "src/app/services/google-api-communication.service";
import { RedirectPagesService } from "src/app/services/redirect-pages.service";

@Component({
  selector: 'app-register-user-as-user',
  templateUrl: './register-user-as-user.component.html',
  styleUrls: ['./register-user-as-user.component.css']
})

export class RegisterUserAsUserComponent implements OnInit{

  userName : any;
  email : any;
  phoneNumber : any;
  birthDate : any;
  errorMessage: any;
  successMessage: any;
  error: boolean = false;
  success: any;
  role : any;

  private validRoles: string[] = ['User'];

  public showPage: boolean = false;

  constructor(
    private registerUserService: RegisterUserService,
    private service: GoogleApiCommunicationService,
    private redirect: RedirectPagesService,
  ) {}

  async ngOnInit(): Promise<void> {

    this.showPage = false;
    let boolValue = await this.service.isAuthenticated(this.validRoles);

    if (!boolValue.exists) {
      //redirect to forbidden page
      this.redirect.forbiddenPage();
    }

    if (!boolValue.valid) {
      this.redirect.lockedPage();
    }

    if(!boolValue.exists && !boolValue.valid){
      this.redirect.logout();
    }

    let user = await this.service.newUserInfos();

    this.email = user.email;
    this.userName = user.userName.trim();
    this.role = user.role;

    if(this.email == null || this.email == "" || this.userName == null || this.userName == "" || this.role == null || this.role == ""){
      this.redirect.forbiddenPage()
    }

    this.showPage = true;
  }

  createUser(){

    let userDTO: ICreateUserDTO = {
      userName : this.userName,
      role : this.role,
      email : this.email,
      phoneNumber : this.phoneNumber,
      birthDate : this.birthDate
    }

    //clears the success message
    this.success = "";

    let errorOrSuccess: any = this.registerUserService.registerUser(userDTO);

    errorOrSuccess.subscribe((data: any) => {
        this.goBack();
      }, //transforms into a http error
      (error: any) => {
        this.error = true;
        if (error.status == 400) {
          this.errorMessage = error.error;
        } else {
          if (error.status == 500) {
            this.errorMessage = error.error.errors.message;
          } else {
            this.errorMessage = "An unknown error has ocurred";
          }
        }
      });
  }

  goBack() {
    window.history.back();
  }
}
