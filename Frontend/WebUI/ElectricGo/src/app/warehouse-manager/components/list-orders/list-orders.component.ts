import { Component, OnInit, ViewChild } from "@angular/core";
import { GetOrdersService } from "../../../services/get-orders.service";
import { MatTableDataSource } from "@angular/material/table";
import IOrderDTO from "../../../shared/orderDTO";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

@Component({
    selector: "app-list-orders",
    templateUrl: "./list-orders.component.html",
    styleUrls: ["./list-orders.component.css"]
})

export class ListOrdersComponent implements OnInit {
    orders = new MatTableDataSource<IOrderDTO>();
    displayedColumns: string[] = ["Order ID", "Date", "Mass", "Loading Time", "Unloading Time", "Warehouse ID"];
    // @ts-ignore
    @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
    // @ts-ignore
    @ViewChild(MatSort, {static: true}) sort: MatSort;

    constructor(
        private getOrdersService: GetOrdersService
    ) {}

    ngAfterViewInit() {
        // @ts-ignore
        this.orders.paginator = this.paginator;
    }

    async ngOnInit(): Promise<void> {
        //calls the service to get the orders
        this.getOrdersService.getOrders().then((data: IOrderDTO[]) => {
          this.orders.data = data;
        }
        );
    }

    goBack() {
        window.history.back();
    }
}
