import {Component, OnInit, ViewChild} from "@angular/core";
import {GetTrucksService} from "../../../services/get-trucks.service";
import {ListUserService} from "../../services/list-user.service";
import {MatLabel} from "@angular/material/form-field";
import {MatTableDataSource} from "@angular/material/table";
import {ICreateUserDTO} from "../../../shared/createUserDTO";
import {MatPaginator} from "@angular/material/paginator";


@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})

export class ListUsersComponent implements OnInit{

  name : any;
  email : any;
  role : any;
  phoneNumber : any;
  birthDate : any;
  errorMessage: any;
  error: boolean = false;

  users = new MatTableDataSource<ICreateUserDTO>()

  displayedColumns: string[] = [
    'name',
    'email',
    'role',
    'phoneNumber',
    'birthDate',
    'activated',
    'Actions'
  ];

  constructor(
    private listUserSerive: ListUserService
  ) {}

  // @ts-ignore
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  ngOnInit(): void {
    this.listUsers();
  }

  listUsers() : any{
    //RESET THE VALUES

    this.errorMessage = '';
    this.error = false;

    this.listUserSerive.listUser().then(
      (data: any) => {
        console.log(data)
        this.users.data = data;
      },
    )


  }

  goBack() {
    window.history.back();
  }


  desactivateUser(user : any) {
    this.errorMessage = '';
    this.error = false;

    this.listUserSerive.desactivateUser(user.email)


    let errorOrSuccess = this.listUserSerive.desactivateUser(user.email);
    errorOrSuccess.subscribe((data: any) => {
        this.listUserSerive.listUser().then(
          (data: any) => {
            this.users.data = data
          },
        (error: any) => {
          this.error = true;
          if (error.status == 400) {
            this.errorMessage = error.error;
          } else {
            if (error.status == 500) {
              this.errorMessage = error.error.errors.message;
            } else {
              this.errorMessage = 'Unknown error!';
            }
          }
        }
        )


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

    this.users.paginator = this.paginator
  }




}
