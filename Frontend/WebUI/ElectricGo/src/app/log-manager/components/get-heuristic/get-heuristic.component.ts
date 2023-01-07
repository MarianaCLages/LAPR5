import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {  } from '../../services/get-heuristic.service';
import {GetHeuristicService} from "../../services/get-heuristic.service";
import {MatTableDataSource} from "@angular/material/table";
import IPackagingDTO from "../../../shared/pathDTO";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import { GoogleApiCommunicationService } from 'src/app/services/google-api-communication.service';
import { RedirectPagesService } from 'src/app/services/redirect-pages.service';

@Component({
  selector: 'app-get-heuristic',
  templateUrl: './get-heuristic.component.html',
  styleUrls: ['./get-heuristic.component.css'],
})

export class GetHeuristicComponent implements OnInit {

  warehouses = new MatTableDataSource<IPackagingDTO>();

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator ;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort ;
  caractId : any;
  heuristic : any;
  date : any;
  displayedColumns: string[] = ['alphaNumId', 'designation', 'street','postalCode','latitudeDegree','latitudeMinute','latitudeSecond','longitudeDregree','longitudeMinute','longitudeSecond'];


  @Output()
  redirectEvent = new EventEmitter<string>();

  public showPage: boolean = false;

  public validRoles: string[] = ["LogisticManager", 'Admin'];

  constructor(
    private getHeuristicService: GetHeuristicService,
    private service: GoogleApiCommunicationService,
    private redirect: RedirectPagesService
  ) { }

  ngAfterViewInit() {
    // @ts-ignore
    this.warehouses.paginator = this.paginator;
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

  goBack() {
    window.history.back();
  }

}
