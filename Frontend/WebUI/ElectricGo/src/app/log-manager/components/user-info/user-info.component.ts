import {Component, OnInit} from "@angular/core";
import {MatTableDataSource} from "@angular/material/table";
import { GoogleApiCommunicationService } from "src/app/services/google-api-communication.service";
import { RedirectPagesService } from "src/app/services/redirect-pages.service";
import {ICreateUserDTO} from "../../../shared/createUserDTO";
import {GetUserService} from "./get-user.service";


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})


export class UserInfoComponent implements OnInit {

  name: any;
  email: any;
  role: any;
  phoneNumber: any;
  birthDate: any;
  errorMessage: any;
  error: boolean = false;

  public showPage: boolean = false;

  public validRoles: string[] = ['Admin', 'User', 'LogisticManager', 'WarehouseManager', 'FleetManager'];

  users = new MatTableDataSource<ICreateUserDTO>()

  displayedColumns: string[] = [
    'name',
    'email',
    'role',
    'phoneNumber',
    'birthDate',
  ];

  public constructor(private listUserService : GetUserService,
    private service: GoogleApiCommunicationService,
    private redirect: RedirectPagesService) {
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
