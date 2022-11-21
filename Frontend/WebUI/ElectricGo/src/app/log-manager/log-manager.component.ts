import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";
import { Location } from '@angular/common';
import { AddPackagingService } from '../services/add-packaging.service';


@Component({
  selector: 'app-log-manager',
  templateUrl: './log-manager.component.html',
  styleUrls: ['./log-manager.component.css'],
  providers: [AddPackagingService]
})
export class LogManagerComponent implements OnInit {
  @Output()
  redirectEvent = new EventEmitter<string>();

  constructor(private router: Router, private location: Location) { }

  ngOnInit(): void {
  }

  addPackaging() {
    //route to add packaging menu
    let opt = 'addPackaging';
    this.redirectEvent.emit(opt);
    const url = 'LogisticManager/' + opt;
    this.router.navigate([url]).then(r => console.log(r));
  }

  listPackagings() {
    //route to list Packagings menu
    let opt = 'listPackagings';
    this.redirectEvent.emit(opt);
    const url = 'LogisticManager/' + opt;
    this.router.navigate([url]).then(r => console.log(r));
  }

  updatePackaging() {
    //route to update Packaging menu
    let opt = 'updatePackaging';
    this.redirectEvent.emit(opt);
    const url = 'LogisticManager/' + opt;
    this.router.navigate([url]).then(r => console.log(r));
  }

  logout() {
    this.location.back();
  }

}
