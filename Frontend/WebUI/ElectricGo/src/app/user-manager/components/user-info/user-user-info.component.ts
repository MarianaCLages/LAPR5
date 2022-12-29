import {Component, OnInit} from "@angular/core";
import {MatTableDataSource} from "@angular/material/table";
import {ICreateUserDTO} from "../../../shared/createUserDTO";
import {GetUserService} from "./get-user.service";


@Component({
  selector: 'app-user-info',
  templateUrl: './user-user-info.component.html',
  styleUrls: ['./user-user-info.component.css']
})


export class UserUserInfoComponent implements OnInit {

  name: any;
  email: any;
  role: any;
  phoneNumber: any;
  birthDate: any;
  errorMessage: any;
  error: boolean = false;

  users = new MatTableDataSource<ICreateUserDTO>()

  displayedColumns: string[] = [
    'name',
    'email',
    'role',
    'phoneNumber',
    'birthDate',
  ];

  public constructor(private listUserService : GetUserService) {
  }

  ngOnInit(): void {
    this.listUser();
  }

  listUser(){

    //RESET THE VALUES

    this.errorMessage = '';
    this.error = false;

    this.listUserService.listUser().then(
      (data: any) => {
        console.log(data)
        let users2 = new MatTableDataSource<ICreateUserDTO>()
        users2.data.push(data);
        this.users.data = users2.data;
        console.log(this.users.data)
        },
    )

  }

  goBack() {
    window.history.back();
  }

}
