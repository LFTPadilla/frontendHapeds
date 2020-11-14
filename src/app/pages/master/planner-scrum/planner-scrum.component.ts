import { Component, OnInit } from '@angular/core';
import { Project } from 'src/app/model/project';

@Component({
  selector: 'app-planner-scrum',
  templateUrl: './planner-scrum.component.html',
  styleUrls: ['./planner-scrum.component.scss']
})
export class PlannerScrumComponent implements OnInit {

  ProjectSelected:Project;
  Projects:Project[] = [ new Project() ];
  IterationSelected:Project;
  Iteration:Project[] = [ new Project() ];



  constructor() { }

  NewIteration(){

  }

  ngOnInit(): void {
  }

}
