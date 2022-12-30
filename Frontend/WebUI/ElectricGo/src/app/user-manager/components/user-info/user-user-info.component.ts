import {Component, NgZone, OnInit} from "@angular/core";
import {MatTableDataSource} from "@angular/material/table";
import {ICreateUserDTO} from "../../../shared/createUserDTO";
import {GetUserService} from "./get-user.service";
import { GoogleApiCommunicationService } from "src/app/services/google-api-communication.service";
import { RedirectPagesService } from "src/app/services/redirect-pages.service";


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

  public showPage: boolean = false;

  public validRoles: string[] = ['Admin'];

  displayedColumns: string[] = [
    'name',
    'email',
    'role',
    'phoneNumber',
    'birthDate',
  ];

  public constructor(private listUserService : GetUserService,
    private service: GoogleApiCommunicationService,
    private redirect: RedirectPagesService,
    private _ngZone: NgZone) {
  }

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


    this.listUser();
  }

  listUser(){

    //RESET THE VALUES

    this.errorMessage = '';
    this.error = false;

    this.service.getProfileInfo().then((res: any) => {
      this._ngZone.run(
        () => {
          let users2 = new MatTableDataSource<ICreateUserDTO>()
          users2.data.push(res);
          this.users.data = users2.data;
        },
        (err: any) => {
          console.log("Invalid token! Please login again!");
        }
      );
    });

  }

  goBack() {
    window.history.back();
  }

}
