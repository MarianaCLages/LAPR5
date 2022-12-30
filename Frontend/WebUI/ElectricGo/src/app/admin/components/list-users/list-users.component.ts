import { Component, OnInit, ViewChild } from '@angular/core';
import { GetTrucksService } from '../../../services/get-trucks.service';
import { ListUserService } from '../../services/list-user.service';
import { MatLabel } from '@angular/material/form-field';
import { MatTableDataSource } from '@angular/material/table';
import { ICreateUserDTO } from '../../../shared/createUserDTO';
import { MatPaginator } from '@angular/material/paginator';
import { GoogleApiCommunicationService } from 'src/app/services/google-api-communication.service';
import { RedirectPagesService } from 'src/app/services/redirect-pages.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
})
export class ListUsersComponent implements OnInit {
  name: any;
  email: any;
  role: any;
  phoneNumber: any;
  birthDate: any;
  errorMessage: any;
  error: boolean = false;

  users = new MatTableDataSource<ICreateUserDTO>();

  public showPage: boolean = false;

  public validRoles: string[] = ['Admin'];

  displayedColumns: string[] = [
    'name',
    'email',
    'role',
    'phoneNumber',
    'birthDate',
    'activated',
    'Actions',
  ];

  constructor(private listUserSerive: ListUserService,
    private service: GoogleApiCommunicationService,
    private redirect: RedirectPagesService) {}

  // @ts-ignore
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

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


    this.listUsers();
  }

  listUsers(): any {
    //RESET THE VALUES

    this.errorMessage = '';
    this.error = false;

    this.listUserSerive.listUser().then((data: any) => {
      console.log(data);
      this.users.data = data;
    });
    this.users.paginator = this.paginator;
  }

  goBack() {
    window.history.back();
  }

  desactivateUser(user: any) {
    this.errorMessage = '';
    this.error = false;

    this.listUserSerive.desactivateUser(user.email);

    let errorOrSuccess = this.listUserSerive.desactivateUser(user.email);
    errorOrSuccess.subscribe(
      (data: any) => {
        this.listUserSerive.listUser().then(
          (data: any) => {
            this.users.data = data;
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
        );
      }, //transforms into a http error
      (error: any) => {
        this.error = true;
        if (error.status == 400) {
          this.errorMessage = error.error;
        } else {
          if (error.status == 500) {
            this.errorMessage = error.error.errors.message;
          } else {
            this.errorMessage = 'An unknown error has ocurred';
          }
        }
      }
    );

    this.users.paginator = this.paginator;
  }
}