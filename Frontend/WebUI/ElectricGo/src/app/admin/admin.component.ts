import {Component, OnInit} from "@angular/core";
import {AddPackagingService} from "../services/add-packaging.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";


@Component({
  selector: 'app-admin-manager',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
  providers: [AddPackagingService]
})

export class AdminComponent implements OnInit{

  constructor(private router: Router, private location: Location) { }

  ngOnInit(): void {
  }

  goTo(destination: any) {
    //changes the route to the destination
    this.router.navigate([destination]).then(r => console.log(r));
  }
}
