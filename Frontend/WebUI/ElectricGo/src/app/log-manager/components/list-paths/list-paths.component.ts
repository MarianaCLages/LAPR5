import { Component, OnInit, ViewChild } from '@angular/core';

import { GetPathsService } from "../../../services/get-paths.service";
import IPathDTO from "../../../shared/pathDTO";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";

@Component({
  selector: 'app-list-paths',
  templateUrl: './list-paths.component.html',
  styleUrls: ['./list-paths.component.css']
})
export class ListPathsComponent implements OnInit {
  paths = new MatTableDataSource<IPathDTO>();
  displayedColumns: string[] = ['Beginning Warehouse', 'Ending Warehouse', 'energy', 'distance', 'time', 'chargingTime'];
  // @ts-ignore
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private getPathsService: GetPathsService
  ) {
  }

  ngAfterViewInit() {
    // @ts-ignore
    this.paths.paginator = this.paginator;
  }

  async ngOnInit(): Promise<void> {
    this.getPathsService.getPaths().then((data: IPathDTO[]) => {
      this.paths.data = data;
    }
    );
  }

  goBack() {
    window.history.back();
  }
}
