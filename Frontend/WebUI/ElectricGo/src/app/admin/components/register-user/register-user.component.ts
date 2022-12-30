

import {Component, OnInit} from "@angular/core";
import { GoogleApiCommunicationService } from "src/app/services/google-api-communication.service";
import { RedirectPagesService } from "src/app/services/redirect-pages.service";
import {ICreateUserDTO} from "../../../shared/createUserDTO";
import {RegisterUserService} from "../../services/register-user.service";

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.css']
})

export class RegisterUserComponent implements OnInit{

  userName : any;
  email : any;
  phoneNumber : any;
  birthDate : any;
  role : any;
  errorMessage: any;
  successMessage: any;
  error: boolean = false;
  success: any;

  public showPage: boolean = false;

  public validRoles: string[] = ['Admin'];

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
        console.log(data);
        this.success = true;
        this.successMessage = "User Created Successfully!";
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
