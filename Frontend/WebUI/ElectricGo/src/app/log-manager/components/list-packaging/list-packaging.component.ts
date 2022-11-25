import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ListPackagingService } from '../../services/list-packaging.service';

@Component({
  selector: 'app-list-packaging',
  templateUrl: './list-packaging.component.html',
  styleUrls: ['./list-packaging.component.css']
})


export class ListPackagingComponent implements OnInit {

  @Output() menuSelected = new EventEmitter<string>();

  packaging: any;
  res: any;

  constructor(
    private listPackagingService: ListPackagingService
  ) { }

  ngOnInit(): void {

  }

  goToMenu(getPackagingPath: string) {
    this.menuSelected.emit(getPackagingPath);
  }

  getPackaging() {
    this.res = this.listPackagingService.getPackaging();
  }

  getPackagingByTruck() {
    this.res = this.listPackagingService.getPackagingByTruck();
  }

  getPackagingByOrder() {
    this.res = this.listPackagingService.getPackagingByOrder();
  }

  goBack() {
    window.history.back();
  }


}
