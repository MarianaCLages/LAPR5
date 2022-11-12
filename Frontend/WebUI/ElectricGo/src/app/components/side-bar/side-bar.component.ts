import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {
  //bar width
  barWidth = "250px";

  constructor() { }

  ngOnInit(): void {
  }

  clickOnBar() {
    //sets the inner div to be pushed to the right

  }

}
