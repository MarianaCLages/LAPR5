import {Component, OnInit} from "@angular/core";
import {MatTableDataSource} from "@angular/material/table";

import {ICreateTripDTO} from "../../../shared/ICreateTripDTO";
import {BestPathForFleetService} from "../../services/best-path-for-fleet.service";

@Component({
  selector: 'app-best-path-for-fleet',
  templateUrl: './best-path-for-fleet.component.html',
  styleUrls: ['./best-path-for-fleet.component.css']
})

export class BestPathForFleetComponent implements OnInit {

  trips = new MatTableDataSource<ICreateTripDTO>();
  algorithmType: any;
  date: any;

  errorMessage: any;
  error: boolean = false;
  success: any;
  successMessage: any;

  public showPage: boolean = true;

  options: string[] = ['Absolute Solution', 'Fast Solution'];

  displayedColumns: string[] = [
    'trip',
    'truck',
    'tripday',
    'orders'
  ];
  constructor(
    private bestPathForFleetService: BestPathForFleetService
  ) {}

  ngOnInit(): void {
    }

  //Falta aqui o sort e paginator tiago
  generateTrips(date : any){
    this.bestPathForFleetService.bestPathForFleetService(date).then((data: any) => {
      this.trips = data;
    });


  }

  goBack() {
    window.history.back();
  }

}
