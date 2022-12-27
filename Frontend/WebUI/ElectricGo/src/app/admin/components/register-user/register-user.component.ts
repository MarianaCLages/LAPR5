

import {Component, OnInit} from "@angular/core";
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

  constructor(
    private registerUserService: RegisterUserService
  ) {}
  ngOnInit(): void {
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
        this.successMessage = "Warehouse Created Successfully!";
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
