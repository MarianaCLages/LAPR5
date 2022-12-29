import {Component, OnInit} from "@angular/core";
import {AddPackagingService} from "../services/add-packaging.service";
import {Router} from "@angular/router";
import {Location} from "@angular/common";


@Component({
  selector: 'app-user-manager',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [AddPackagingService]
})

export class UserComponent implements OnInit{

  constructor(private router: Router, private location: Location) { }

  ngOnInit(): void {
  }

  goTo(destination: any) {
    //changes the route to the destination
    this.router.navigate([destination]).then(r => console.log(r));
  }
}
