import { Component, ViewChild } from '@angular/core';
import { GetOrdersService } from '../../../services/get-orders.service';
import { MatTableDataSource } from '@angular/material/table';
import IOrderDTO from '../../../shared/orderDTO';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { ThemePalette } from '@angular/material/core';
import { GoogleApiCommunicationService } from 'src/app/services/google-api-communication.service';
import { RedirectPagesService } from 'src/app/services/redirect-pages.service';

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-list-orders',
  templateUrl: './list-orders.component.html',
  styleUrls: ['./list-orders.component.css'],
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
    'All Orders',
  ];

  orderIdentifier: any;
  orderFilterDate: any;
  warehouseFilterID: any;
  dualFilterOn: boolean = false;

  orders = new MatTableDataSource<IOrderDTO>();
  displayedColumns: string[] = [
    'Order ID',
    'Order Date',
    'Order Mass',
    'Loading Time',
    'Unloading Time',
    'Warehouse ID',
  ];
  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  allComplete: boolean = false;

  private validRoles: string[] = ['WarehouseManager', 'Admin'];
  public showPage: boolean = false;

  constructor(
    private getOrdersService: GetOrdersService,
    private service: GoogleApiCommunicationService,
    private redirect: RedirectPagesService
  ) {}

  ngAfterViewInit() {
    // @ts-ignore
    this.orders.paginator = this.paginator;
    this.orders.sort = this.sort;
  }

  async ngOnInit(): Promise<void> {
    this.showPage = false;
    let boolValue = await this.service.isAuthenticated(this.validRoles);

    if (!boolValue.exists) {
      this.redirect.forbiddenPage();
    }

    if (!boolValue.valid) {
      this.redirect.lockedPage();
    }

    if (!boolValue.exists && !boolValue.valid) {
      this.redirect.logout();
    }

    this.showPage = true;

    //calls the service to get the orders
    this.getOrdersService.getOrders().then((data: any) => {
      this.orders.data = data;
      this.orders.paginator = this.paginator;
      this.orders.sort = this.sort;
    });
  }

  chooseFilter() {
    //clear the form
    this.orderIdentifier = null;
    this.orderFilterDate = null;
    this.warehouseFilterID = null;

    if (this.filterOption == 'Order Date and Warehouse ID') {
      this.dualFilterOn = true;
    } else {
      this.dualFilterOn = false;
    }

    if (this.filterOption == 'All Orders') {
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
      this.getOrdersService
        .getOrdersByDateAndWarehouseID(
          this.orderFilterDate,
          this.warehouseFilterID
        )
        .then(
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
    this.orders.sort = this.sort;
  }

  goBack() {
    window.history.back();
  }

  sortChangeByActive(sortState: Sort) {
    console.log(sortState.active);

    if (sortState.active == 'Order ID') {
      if (sortState.direction == 'asc') {
        this.orders.data.sort((a: any, b: any) =>
          a.identifier > b.identifier ? -1 : 1
        );
      } else if (sortState.direction == 'desc') {
        this.orders.data.sort((a: any, b: any) =>
          a.identifier > b.identifier ? 1 : -1
        );
      }
    } else if (sortState.active == 'Order Date') {
      if (sortState.direction == 'asc') {
        this.orders.data.sort((a: any, b: any) => {
          var auxA1 = a.orderDate.split(' ');
          var auxA = auxA1[0].split('/');

          var auxB1 = b.orderDate.split(' ');
          var auxB = auxB1[0].split('/');

          if (auxA[2] > auxB[2]) {
            return 1;
          } else if (auxA[2] < auxB[2]) {
            return -1;
          } else {
            if (auxA[1] > auxB[1]) {
              return 1;
            } else if (auxA[1] < auxB[1]) {
              return -1;
            } else {
              if (auxA[0] > auxB[0]) {
                return 1;
              } else if (auxA[0] < auxB[0]) {
                return -1;
              } else {
                return 0;
              }
            }
          }
        });
      } else if (sortState.direction == 'desc') {
        this.orders.data.sort((a: any, b: any) => {
          var auxA1 = a.orderDate.split(' ');
          var auxA = auxA1[0].split('/');

          var auxB1 = b.orderDate.split(' ');
          var auxB = auxB1[0].split('/');

          if (auxA[2] > auxB[2]) {
            return -1;
          } else if (auxA[2] < auxB[2]) {
            return 1;
          } else {
            if (auxA[1] > auxB[1]) {
              return -1;
            } else if (auxA[1] < auxB[1]) {
              return 1;
            } else {
              if (auxA[0] > auxB[0]) {
                return -1;
              } else if (auxA[0] < auxB[0]) {
                return 1;
              } else {
                return 0;
              }
            }
          }
        });
      }
    } else if (sortState.active == 'Warehouse ID') {
      if (sortState.direction == 'asc') {
        this.orders.data.sort((a: any, b: any) =>
          a.warehouseId > b.warehouseId ? -1 : 1
        );
      } else if (sortState.direction == 'desc') {
        this.orders.data.sort((a: any, b: any) =>
          a.warehouseId > b.warehouseId ? 1 : -1
        );
      }
    }
  }
}
