import { Component, OnInit } from '@angular/core';
import { ListPackagingService } from '../../services/list-packaging.service';

@Component({
  selector: 'app-list-packaging',
  templateUrl: './list-packaging.component.html',
  styleUrls: ['./list-packaging.component.css']
})
export class ListPackagingComponent implements OnInit {

  packaging: any;

  constructor(
    private listPackagingService: ListPackagingService
  ) { }

  ngOnInit(): void {

    this.packaging = this.listPackagingService.getPackaging();

  }



}
