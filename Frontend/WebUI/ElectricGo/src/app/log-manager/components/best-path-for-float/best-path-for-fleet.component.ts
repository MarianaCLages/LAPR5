import {Component, OnInit, ViewChild} from "@angular/core";
import {MatTableDataSource} from "@angular/material/table";

import {ICreateTripDTO} from "../../../shared/ICreateTripDTO";
import {BestPathForFleetService} from "../../services/best-path-for-fleet.service";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, Sort} from '@angular/material/sort';
import {GetTrucksService} from "../../../services/get-trucks.service";
import {FormControl} from "@angular/forms";
import ITripDTO from "../../../shared/tripDTO";

@Component({
  selector: 'app-best-path-for-fleet',
  templateUrl: './best-path-for-fleet.component.html',
  styleUrls: ['./best-path-for-fleet.component.css']
})

export class BestPathForFleetComponent implements OnInit {

  trips = new MatTableDataSource<ITripDTO>();
  algorithmType: any;
  allTrucks: any;
  truckList: any;

  dataAlr: any;

  controlTruck = new FormControl('');
  errorMessage: any;
  error: boolean = false;
  success: any;
  successMessage: any;

  trucks: any = [];
  date: any;


  public showPage: boolean = true;

  options: string[] = ['Absolute Solution', 'Fast Solution'];

  displayedColumns: string[] = [
    'trip',
    'truck',
    'tripday',
    'orders',
    'warehouses'
  ];

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private bestPathForFleetService: BestPathForFleetService,
    private listTrucksService: GetTrucksService
  ) {
  }

  async ngOnInit(): Promise<void> {
    await this.getAlltrucks();
  }

  async getAlltrucks(): Promise<void> {
    //gets the trucks from the backend
    this.listTrucksService.getTrucks().then((data: any) => {
      this.allTrucks = data;
    });
  }

  async generateTrips(): Promise<any> {
    let tripDTO: ICreateTripDTO = {
      truck: this.trucks,
      date: this.date
    }

    this.bestPathForFleetService.bestPathForFleetService(tripDTO).then((data: any) => {
      console.log(data);
      /*      console.log(JSON.stringify(data._value));

            this.dataAlr = data._value;
            console.log(data._value[0].tripOrders)

            let dataAux : any[] = [];

            //warehouse arr
            let warehouseArr : any[] = [];

            //warehouses string criada
            let warehousesStr : any = "";

            let i : number = 0;
            this.dataAlr.forEach((info: any) => {

              let tripWarehouses : string = "";
              let tripOrders : string = "";

              info.tripWarehouses[i].forEach((info: any) => {
                warehousesStr += info;
              });

              warehouseArr.push(warehousesStr);
              warehousesStr = "";


              tripWarehouses += info.tripWarehouses[i];
              tripOrders += info.tripOrders[i];
              i++;

              const auxVar : any = {tripIdentifier: info.tripIdentifier,
                tripTruck: info.tripTruck,
                tripDay: info.tripDay,
                tripWarehouses: tripWarehouses,
                tripOrders: tripOrders
              }

              dataAux.push(auxVar);

              console.log(auxVar);

            });*/


      /*   // @ts-ignore
         let value: [{
           warehouse: string,
           order: string[]
         }] = [];

         warehouseOrders.forEach(
           (warehouseOrders) => {
             value.push({
               warehouse: warehouseOrders.warehouse,
               order: warehouseOrders.order
             })
           }
         )


         return {
           tripIdentifier: trip.tripIdentifier.value,
           tripTruck: trip.tripTruck.value,
           tripDay: trip.tripDay.value,
           tripWarehouses: trip.tripWarehouses.value,
           tripOrders: value
         };
         */

      this.trips.data = data._value;
      console.log(this.trips.data);
      this.trips.paginator = this.paginator;
      this.trips.sort = this.sort;
    });

  }

  goBack() {
    window.history.back();
  }

}
