import { Component, OnInit, ViewChild} from '@angular/core';
import { IPackagingDTO } from 'src/app/shared/packagingDTO';
import { MatTableDataSource } from '@angular/material/table';
import { ListPackagingService } from '../../services/list-packaging.service';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-list-packaging',
  templateUrl: './list-packaging.component.html',
  styleUrls: ['./list-packaging.component.css']
})

export class ListPackagingComponent implements OnInit {
  packagings = new MatTableDataSource<IPackagingDTO>();

  displayedColumns: string[] = ['OrderRef', 'TruckRef', 'xPos', 'yPos', 'zPos'];
  // @ts-ignore
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator ;
  // @ts-ignore
  @ViewChild(MatSort, {static: true}) sort: MatSort ;

  constructor(
    private listPackagingService: ListPackagingService
  ) {}

  ngAfterViewInit() {
    // @ts-ignore
    this.packagings.paginator = this.paginator;
  }

  async ngOnInit(): Promise<void> {
    //calls the service to get the packagigns
    this.listPackagingService.getPackaging().then((data: IPackagingDTO[]) => {
      console.log(data);
      this.packagings.data = data;
    });
  }
  
  goBack() {
    window.history.back();
  }
}

