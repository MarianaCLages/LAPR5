import { Component, ViewChild } from "@angular/core";
import { GetOrdersService } from "../../../services/get-orders.service";
import { MatTableDataSource } from "@angular/material/table";
import IOrderDTO from "../../../shared/orderDTO";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ThemePalette } from "@angular/material/core";

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
    selector: "app-list-orders",
    templateUrl: "./list-orders.component.html",
    styleUrls: ["./list-orders.component.css"]
})

export class ListOrdersComponent {
  identifier: any;
  orderDate: any;
  orderMass: any;
  chargingTime: any;
  unlodingTime: any;
  warehouseId: any;
  filterOption: any;
  errormessage: any;
  error: boolean = false;
  options: string[] = [
    'Order ID',
    'Order Date',
    'Warehouse ID',
    'Order Date and Warehouse ID',
    'All Orders'
  ];

  orderIdentifier : any;
  orderFilterDate : any;
  warehouseFilterID: any;
  dualFilterOn : boolean = false;

  orders = new MatTableDataSource<IOrderDTO>();
  displayedColumns: string[] = [
    'Order ID',
    'Order Date',
    'Order Mass',
    'Loading Time',
    'Unloading Time',
    'Warehouse ID'
  ];
  // @ts-ignore
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  allComplete: boolean = false;

  constructor(
      private getOrdersService: GetOrdersService
  ) {}

  ngAfterViewInit() {
      // @ts-ignore
      this.orders.paginator = this.paginator;
  }
  async ngOnInit(): Promise<void> {
    //calls the service to get the orders
    this.getOrdersService.getOrders().then((data: any) => {
      this.orders.data = data;
    });
  }

  chooseFilter() {
    //clear the form
    this.orderIdentifier = null;
    this.orderFilterDate = null;
    this.warehouseFilterID = null;

    if(this.filterOption == 'Order Date and Warehouse ID'){
      this.dualFilterOn = true;
    } else {
      this.dualFilterOn = false;
    }

    if(this.filterOption == 'All Orders') {
      this.getOrdersByFilter();
    }
  }

  getOrdersByFilter() {
    //reset the values
    this.errormessage = '';
    this.error = false;

    if (this.filterOption == 'Order ID') {
      this.getOrdersService.getOrdersByID(this.orderIdentifier).then(
        (data: any) => {
          this.orders.data = data;
          this.orders.paginator = this.paginator;
        },
        //transforms into a http error
        (error: any) => {
          this.error = true;
          if (error.status == 400) {
            this.errormessage = error.error;
          } else {
            if (error.status == 500) {
              this.errormessage = error.error.errors.message;
            } else {
              this.errormessage = 'An unknown error has occurred!';
            }
          }
        }
      );
    } else if (this.filterOption == 'Order Date') {
      this.getOrdersService.getOrdersByDate(this.orderFilterDate).then(
        (data: any) => {
          this.orders.data = data;
        },
        //transforms into a http error
        (error: any) => {
          this.error = true;
          if (error.status == 400) {
            this.errormessage = error.error;
          } else {
            if (error.status == 500) {
              this.errormessage = error.error.errors.message;
            } else {
              this.errormessage = 'An unknown error has occurred!';
            }
          }
        }
      );
    } else if (this.filterOption == 'Warehouse ID') {
      this.getOrdersService.getOrdersByWarehouseID(this.warehouseFilterID).then(
        (data: any) => {
          this.orders.data = data;
        },
        //transforms into a http error
        (error: any) => {
          this.error = true;
          if (error.status == 400) {
            this.errormessage = error.error;
          } else {
            if (error.status == 500) {
              this.errormessage = error.error.errors.message;
            } else {
              this.errormessage = 'An unknown error has occurred!';
            }
          }
        }
      );
    } else if (this.filterOption == 'All Orders') {
      this.getOrdersService.getOrders().then(
        (data: any) => {
          this.orders.data = data;
        },
        //transforms into a http error
        (error: any) => {
          this.error = true;
          if (error.status == 400) {
            this.errormessage = error.error;
          } else {
            if (error.status == 500) {
              this.errormessage = error.error.errors.message;
            } else {
              this.errormessage = 'An unknown error has occurred!';
            }
          }
        }
      );
    } else if (this.filterOption == 'Order Date and Warehouse ID') {
      this.getOrdersService.getOrdersByDateAndWarehouseID(this.orderFilterDate, this.warehouseFilterID).then(
        (data: any) => {
          this.orders.data = data;
        },
        //transforms into a http error
        (error: any) => {
          this.error = true;
          if (error.status == 400) {
            this.errormessage = error.error;
          } else {
            if (error.status == 500) {
              this.errormessage = error.error.errors.message;
            } else {
              this.errormessage = 'An unknown error has occurred!';
            }
          }
        }
      );
    }
    this.orders.paginator = this.paginator;
  }

  goBack() {
    window.history.back();
  }
}
