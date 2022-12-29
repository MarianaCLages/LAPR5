

import {Component, OnInit} from "@angular/core";
import {ICreateUserDTO} from "../../../shared/createUserDTO";
import {RegisterUserService} from "../../../admin/services/register-user.service";
import { GoogleApiCommunicationService } from "src/app/services/google-api-communication.service";

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

  private validRoles: string[] = ['User', 'Admin'];

  constructor(
    private registerUserService: RegisterUserService,
    private service: GoogleApiCommunicationService
  ) {}
  async ngOnInit(): Promise<void> {
    let boolValue = this.service.isAuthenticated(this.validRoles);

    let user = await this.service.newUserInfos();

    this.email = user.email;
    this.userName = user.userName.trim();
    this.role = user.role;

    if(!boolValue){
      this.goBack();
    }
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
