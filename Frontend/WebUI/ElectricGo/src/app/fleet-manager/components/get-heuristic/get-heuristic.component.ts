import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {  } from '../../services/get-heuristic.service';
import {GetHeuristicService} from "../../services/get-heuristic.service";

@Component({
  selector: 'app-get-heuristic',
  templateUrl: './get-heuristic.component.html',
  styleUrls: ['./get-heuristic.component.css'],
})

export class GetHeuristicComponent implements OnInit {

  caractId : any;
  heuristic : any;

  @Output()
  redirectEvent = new EventEmitter<string>();

  constructor(
    private getHeuristicService: GetHeuristicService
  ) { }

  ngOnInit(): void {
  }

  async getHeuristic(){

    this.heuristic = await this.getHeuristicService.getHeuristics(this.caractId);
    console.log(this.heuristic);
  }
}
