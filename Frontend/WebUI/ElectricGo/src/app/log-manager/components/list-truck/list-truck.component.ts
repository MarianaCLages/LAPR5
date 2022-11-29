import {Component, OnInit, ViewChild} from '@angular/core';
import {GetTrucksService} from '../../../services/get-trucks.service'
import {ThemePalette} from '@angular/material/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatTableDataSource} from "@angular/material/table";
import {MatSort} from "@angular/material/sort";
import {ITruckDTO} from '../../../shared/truckDTO';


export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-list-truck',
  templateUrl: './list-truck.component.html',
  styleUrls: ['./list-truck.component.css'],
  providers: [GetTrucksService],

})

export class ListTruckComponent {

  subtasks: any[] = [];

  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Filter by Truck Characteristic', completed: false, color: 'primary'},
      {name: 'Filter by Truck Plate', completed: false, color: 'primary'},
    ],
  };

  trucks = new MatTableDataSource<ITruckDTO>();
  displayedColumns: string[] = ['Truck characteristic', 'Truck Plate', 'Weight Capacity', 'Max Weight Capacity', 'Max Battery', 'Tare', 'Charging Time'];
  // @ts-ignore
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator ;
  // @ts-ignore
  @ViewChild(MatSort, {static: true}) sort: MatSort ;

  allComplete: boolean = false;

  updateAllComplete() {
    this.allComplete = this.task.subtasks != null && this.task.subtasks.every(t => t.completed);
    console.log("HAHAHHAHAHAH");
  }

  constructor(
    private getTrucksService: GetTrucksService
  ) { }

  ngAfterViewInit() {
    // @ts-ignore
    this.trucks.paginator = this.paginator;
  }

  async ngOnInit(): Promise<void> {
    this.getTrucksService.getTrucks().then((data: any) => {
      this.trucks = data;
    });
  }

  goBack() {
    window.history.back();
  }


}
