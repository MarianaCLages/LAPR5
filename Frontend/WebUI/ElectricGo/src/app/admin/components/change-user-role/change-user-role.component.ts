import {Component, OnInit} from "@angular/core";
import {ListUserService} from "../../services/list-user.service";
import {MatTableDataSource} from "@angular/material/table";
import {ICreateUserDTO} from "../../../shared/createUserDTO";
import {ChangeUserRoleService} from "../../services/change-user-role.service";
import {ActivatedWarehouseDTO} from "../../../shared/ActivatedWarehouseDTO";
import {DatePipe, formatDate} from '@angular/common'

@Component({
  selector: 'app-change-user-roles',
  templateUrl: './change-user-role.component.html',
  styleUrls: ['./change-user-role.component.css']
})

export class ChangeUserRoleComponent implements OnInit{


  email : any;
  role : any;
  error: boolean = false;
  errorMessage: any;

  datePipe : any;
  user = new MatTableDataSource<ICreateUserDTO>()

  displayedColumns: string[] = [
    'email',
    'role'

  ];

  constructor(
    private changeUserRoleService : ChangeUserRoleService
  ) {}



  ngOnInit(): void {
  }

  changeUserRole() : any{


    let userDTO : any;

    let errorOrSuccess: any = this.changeUserRoleService.checkUser(this.email);
    errorOrSuccess.subscribe((data : any) =>{

        let date = data.birthDate.split(' ')

        userDTO = {
          name : data.name,
          email : this.email,
          role : this.role,
          phoneNumber : data.phoneNumber,
          birthDate : date[0]
      }

      console.log(userDTO)
      let errorOrSuccess2: any = this.changeUserRoleService.changeUser(userDTO.email,userDTO);
      errorOrSuccess2.subscribe((data2: any) => {



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


    })




  }

  goBack() {
    window.history.back();
  }






}
