import { Component, OnInit } from '@angular/core';
import { ListPackagingService } from '../../services/list-packaging.service';

@Component({
  selector: 'app-get-packaging-by-truck',
  templateUrl: './get-packaging-by-truck.component.html',
  styleUrls: ['./get-packaging-by-truck.component.css']
})
export class GetPackagingByTruckComponent implements OnInit {

  packagings: any [] = [];
  errorMessage: any;
  error: boolean = false;

  constructor(
    private listPackagingService: ListPackagingService
  ) { }

  ngOnInit(): void {
    this.error = false;
  }

  getPackagingByTruck() {
    this.listPackagingService.getPackagingByTruck();
    let errorOrSuccess: any = this.listPackagingService.getPackagingByTruck();
    errorOrSuccess.subscribe(
      (error: any) => {
        this.error = true;
        if (error.status == 400) {
          this.errorMessage = error.error;
        }
        else {
          if (error.status == 500) {

            this.errorMessage = error.error.errors.message;
          }
          else {
            this.errorMessage = "An unknown error has ocurred";
          }
        }
      }
    );
  }

  goBack() {
    window.history.back();
  }
  

}
