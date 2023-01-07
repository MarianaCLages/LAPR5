import { Component, OnInit, ViewChild } from '@angular/core';

import { IPackagingDTO } from 'src/app/shared/packagingDTO';
import { ListPackagingService } from '../../services/list-packaging.service';
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from '@angular/material/table';
import { GoogleApiCommunicationService } from 'src/app/services/google-api-communication.service';
import { RedirectPagesService } from 'src/app/services/redirect-pages.service';

@Component({
  selector: 'app-list-packaging',
  templateUrl: './list-packaging.component.html',
  styleUrls: ['./list-packaging.component.css']
})

export class ListPackagingComponent implements OnInit {


  orderRef: any;
  truckRef: any;
  filterOption: any;
  dualFilter: any;
  errorMessage: any;
  error: boolean = false;
  options: string[] = [
    'Packaging Truck',
    'Packaging Order',
    'All Packagings',
  ];
  packagings = new MatTableDataSource<IPackagingDTO>();

  displayedColumns: string[] = ['OrderRef', 'TruckRef', 'xPos', 'yPos', 'zPos'];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  public showPage: boolean = false;

  public validRoles: string[] = ["LogisticManager", 'Admin'];

  constructor(
    private listPackagingService: ListPackagingService,
    private service: GoogleApiCommunicationService,
    private redirect: RedirectPagesService
  ) { }

  ngAfterViewInit() {
    // @ts-ignore
    this.packagings.paginator = this.paginator;
    this.packagings.sort = this.sort;
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


    //calls the service to get the packagigns
    this.listPackagingService.getPackaging().then((data: IPackagingDTO[]) => {
      this.packagings.data = data;
      this.packagings.paginator = this.paginator;
      this.packagings.sort = this.sort;
    });
  }

  goBack() {
    window.history.back();
  }

  chooseFilter() {
    //CLEAR THE FORM
    this.orderRef = null;
    this.truckRef = null;

    if (this.filterOption == 'AllPackagings') {
      this.getPackagingsByFilter();
    }
  }

  getPackagingsByFilter() {
    this.errorMessage = '';
    this.error = false;
    if (this.filterOption == 'Packaging Order') {
      this.listPackagingService.getPackagingByOrder(this.orderRef).then((data: any) => {
        this.packagings = data;
        this.packagings.paginator = this.paginator;
        this.packagings.sort = this.sort;
      },
        (error: any) => {
          this.error = true;
          if (error.status == 404) {
            this.errorMessage = error.error;
          } else {
            if (error.status == 500) {
              this.errorMessage = error.error.errors.message;
            } else {
              this.errorMessage = "Unknown error";
            }
          }
        }
      )
    } else if (this.filterOption == 'Packaging Truck') {
      this.listPackagingService.getPackagingByTruck(this.truckRef).then((data: any) => {
        this.packagings = data;
        this.packagings.paginator = this.paginator;
        this.packagings.sort = this.sort;
      },
        (error: any) => {
          this.error = true;
          if (error.status == 404) {
            this.errorMessage = error.error;
          } else {
            if (error.status == 500) {
              this.errorMessage = error.error.errors.message;
            } else {
              this.errorMessage = "Unknown error";
            }
          }
        }
      );
    } else if (this.filterOption == 'AllPackagings') {
      this.listPackagingService.getPackaging().then((data: IPackagingDTO[]) => {
        this.packagings.data = data;
        this.packagings.paginator = this.paginator;
        this.packagings.sort = this.sort;
      },
        (error: any) => {
          this.error = true;
          if (error.status == 400) {
            this.errorMessage = error.error;
          } else {
            if (error.status == 500) {
              this.errorMessage = error.error.errors.message;
            } else {
              this.errorMessage = "Unknown error";
            }
          }
        }
      );
    }
  }
}

