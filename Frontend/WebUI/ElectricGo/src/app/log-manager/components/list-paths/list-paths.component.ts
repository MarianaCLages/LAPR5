import {Component, OnInit, ViewChild} from '@angular/core';
import {GetPathsService} from "../../../services/get-paths.service";
import {MatTableDataSource} from "@angular/material/table";
import IPathDTO from "../../../shared/pathDTO";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-list-paths',
  templateUrl: './list-paths.component.html',
  styleUrls: ['./list-paths.component.css']
})
export class ListPathsComponent implements OnInit {
  paths = new MatTableDataSource<IPathDTO>();
  displayedColumns: string[] = ['Beginning Warehouse', 'Ending Warehouse', 'energy', 'distance', 'time', 'chargingTime'];
  // @ts-ignore
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator ;
  // @ts-ignore
  @ViewChild(MatSort, {static: true}) sort: MatSort ;

  constructor(
    private getPathsService: GetPathsService
  ) {
  }

  ngAfterViewInit() {
    // @ts-ignore
    this.paths.paginator = this.paginator;
  }

  ngOnInit(): void {
    //calls the service to get the paths
    this.getPathsService.getPaths().subscribe((paths => {
      // @ts-ignore
      this.paths.data = paths;
      // @ts-ignore
      this.paths.sort = this.sort;
      // @ts-ignore
      this.paths.paginator = this.paginator;

    }));


  }

  goBack() {
    window.history.back();
  }
}
