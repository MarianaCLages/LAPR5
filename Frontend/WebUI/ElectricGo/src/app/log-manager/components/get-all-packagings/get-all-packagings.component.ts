import { Component, OnInit } from '@angular/core';
import { ListPackagingService } from '../../services/list-packaging.service';

@Component({
  selector: 'app-get-all-packagings',
  templateUrl: './get-all-packagings.component.html',
  styleUrls: ['./get-all-packagings.component.css']
})
export class GetAllPackagingsComponent implements OnInit {

  packagings: any [] = [];
  errorMessage: any;
  error: boolean = false;

  constructor(
    private listPackagingService: ListPackagingService
  ) { }

  ngOnInit(): void {
    this.error = false;
  }

  getAllPackagings() {
    this.packagings = this.listPackagingService.getPackaging();
  let errorOrSuccess: any = this.listPackagingService.getPackaging();
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
