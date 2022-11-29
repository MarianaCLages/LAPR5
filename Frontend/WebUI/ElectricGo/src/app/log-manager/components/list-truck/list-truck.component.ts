import {Component, OnInit, ViewChild} from '@angular/core';
import {GetTrucksService} from '../../../services/get-trucks.service'
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {ITruckDTO} from '../../../shared/truckDTO';

@Component({
  selector: 'app-list-truck',
  templateUrl: './list-truck.component.html',
  styleUrls: ['./list-truck.component.css'],
  providers: [GetTrucksService],

})
export class ListTruckComponent {

  trucks = new MatTableDataSource<ITruckDTO>();
  displayedColumns: string[] = ['Truck characteristic', 'Truck Plate', 'Weight Capacity', 'Max Weight Capacity', 'Max Battery', 'Tare', 'Charging Time'];
  // @ts-ignore
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator ;
  // @ts-ignore
  @ViewChild(MatSort, {static: true}) sort: MatSort ;

  constructor(
    private getTrucksService: GetTrucksService
  ) { }

  ngAfterViewInit() {
    // @ts-ignore
    this.trucks.paginator = this.paginator;
  }

  async ngOnInit(): Promise<void> {
    this.getTrucksService.getTrucks().then((data: ITruckDTO[]) => {
      this.trucks.data = data;
    });
  }

  goBack() {
    window.history.back();
  }


}
