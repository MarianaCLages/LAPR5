import { Component, OnInit, ViewChild } from '@angular/core';

import { GetPathsService } from "../../../services/get-paths.service";
import IPathDTO from "../../../shared/pathDTO";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { GoogleApiCommunicationService } from 'src/app/services/google-api-communication.service';
import { RedirectPagesService } from 'src/app/services/redirect-pages.service';

@Component({
  selector: 'app-list-paths',
  templateUrl: './list-paths.component.html',
  styleUrls: ['./list-paths.component.css']
})
export class ListPathsComponent implements OnInit {
  endWare: any;
  benWare: any;

  private validRoles: string[] = ['LogisticManager', 'Admin'];

  options: string[] = [
    'Path by Beginning Warehouse',
    'Path by Ending Warehouse',
    'Path by Beginning and Ending Warehouse',
    'All Paths',
  ];



  paths = new MatTableDataSource<IPathDTO>();
  displayedColumns: string[] = ['Beginning Warehouse', 'Ending Warehouse', 'energy', 'distance', 'time', 'chargingTime'];
  // @ts-ignore
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  filterOption: any;

  public showPage: boolean = false;


  constructor(
    private getPathsService: GetPathsService,
    private service: GoogleApiCommunicationService,
    private redirect: RedirectPagesService
  ) {
  }

  getPathsByFilter() {
    if (this.filterOption == "Path by Beginning Warehouse") {
      this.getPathsService.getPathsByBeginningWarehouse(this.benWare).then((data: IPathDTO[]) => {
        this.paths.data = data;
      },
        (error: any) => {
          alert(error.error);
        });
    } else if (this.filterOption == "Path by Ending Warehouse") {
      this.getPathsService.getPathsByEndingWarehouse(this.endWare).then((data: IPathDTO[]) => {
        this.paths.data = data;
      },
        (error: any) => {
          alert(error.error);
        });
    } else if (this.filterOption == "Path by Beginning and Ending Warehouse") {
      this.getPathsService.getPathsByBeginningAndEndingWarehouse(this.benWare, this.endWare).then((data: IPathDTO[]) => {
        this.paths.data = data;
      },
        (error: any) => {
          alert(error.error);
        });
    } else if (this.filterOption == "All Paths") {
      this.getPathsService.getPaths().then((data: IPathDTO[]) => {
        this.paths.data = data;
      },
        (error: any) => {
          alert(error.error);
        });
    }

  }

  chooseFilter() {
    //clear the form
    this.benWare = null;
    this.endWare = null;
    if (this.filterOption == "All Paths") {
      this.getPathsService.getPaths().then((data: IPathDTO[]) => {
        this.paths.data = data;
      });
    }
  }

  ngAfterViewInit() {
    // @ts-ignore
    this.paths.paginator = this.paginator;
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
    this.getPathsService.getPaths().then((data: IPathDTO[]) => {
      this.paths.data = data;
    }
    );
  }

  goBack() {
    window.history.back();
  }
}
