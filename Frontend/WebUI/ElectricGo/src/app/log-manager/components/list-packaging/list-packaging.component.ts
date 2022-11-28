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
  
  displayedColumns: string[] = ['id', 'OrderRef', 'TruckRef'];
  // @ts-ignore
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator ;
  // @ts-ignore
  @ViewChild(MatSort, {static: true}) sort: MatSort ;

  constructor(
    private listPackagingService: ListPackagingService
  ) {
  }

  ngAfterViewInit() {
    // @ts-ignore
    this.packagings.paginator = this.paginator;
  }

  ngOnInit(): void {
    //calls the service to get the packagigns
    this.listPackagingService.getPackaging().subscribe((packagings => {
      // @ts-ignore
      this.packagings.data = packagings;
      // @ts-ignore
      this.packagings.sort = this.sort;
      // @ts-ignore
      this.packagings.paginator = this.paginator;

      // filter by order ref
      this.packagings.filterPredicate = (data, filter) => {
        return data.orderRef.toLowerCase().includes(filter);
      }

      // filter by truck ref
      this.packagings.filterPredicate = (data, filter) => {
        return data.truckRef.toLowerCase().includes(filter);
      }
    }));
  }
  goBack() {
    window.history.back();
  }
}

