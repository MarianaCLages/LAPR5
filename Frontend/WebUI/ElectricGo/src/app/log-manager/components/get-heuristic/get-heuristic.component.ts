import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {  } from '../../services/get-heuristic.service';
import {GetHeuristicService} from "../../services/get-heuristic.service";
import {MatTableDataSource} from "@angular/material/table";
import IPackagingDTO from "../../../shared/pathDTO";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";

@Component({
  selector: 'app-get-heuristic',
  templateUrl: './get-heuristic.component.html',
  styleUrls: ['./get-heuristic.component.css'],
})

export class GetHeuristicComponent implements OnInit {

  warehouses = new MatTableDataSource<IPackagingDTO>();

  // @ts-ignore
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator ;
  // @ts-ignore
  @ViewChild(MatSort, {static: true}) sort: MatSort ;
  caractId : any;
  heuristic : any;
  date : any;
  displayedColumns: string[] = ['alphaNumId', 'designation', 'street','postalCode','latitudeDegree','latitudeMinute','latitudeSecond','longitudeDregree','longitudeMinute','longitudeSecond'];


  @Output()
  redirectEvent = new EventEmitter<string>();

  constructor(
    private getHeuristicService: GetHeuristicService
  ) { }

  ngAfterViewInit() {
    // @ts-ignore
    this.warehouses.paginator = this.paginator;
  }

  ngOnInit(): void {
  }

  async getHeuristic(){

    this.heuristic = await this.getHeuristicService.getHeuristics(this.caractId,this.date);

    this.warehouses.data = this.heuristic;
    this.warehouses.sort = this.sort;
    this.warehouses.paginator = this.paginator;
  }

  async getHeuristicWeight(){

    this.heuristic = await this.getHeuristicService.getHeuristicByWeight(this.caractId,this.date);
    this.warehouses.data = this.heuristic;
    this.warehouses.sort = this.sort;
    this.warehouses.paginator = this.paginator;
  }

  async getHeuristicTimeWeight(){
    this.heuristic = await this.getHeuristicService.getHeuristicByWeightTime(this.caractId,this.date);
    this.warehouses.data = this.heuristic;
    this.warehouses.sort = this.sort;
    this.warehouses.paginator = this.paginator;
  }
}
