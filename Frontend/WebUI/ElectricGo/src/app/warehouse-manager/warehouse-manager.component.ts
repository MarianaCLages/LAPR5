import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import { Location } from '@angular/common';
import { AddWarehouseService } from '../services/add-warehouse.service'

@Component({
  selector: 'app-warehouse-manager',
  templateUrl: './warehouse-manager.component.html',
  styleUrls: ['./warehouse-manager.component.css'],
  providers: [AddWarehouseService]
})
export class WarehouseManagerComponent implements OnInit {
  @Output()
  redirectEvent = new EventEmitter<string>();

  constructor(private router: Router, private location: Location) { }

  ngOnInit(): void {
  }

  addWarehouse(){
    //route to add packaging menu
    let opt = 'addWarehouse';
    this.redirectEvent.emit(opt);
    const url = 'WarehouseManager/' + opt;
    this.router.navigate([url]).then(r => console.log(r));
  }

  logout() {
    this.location.back();
  }
}
