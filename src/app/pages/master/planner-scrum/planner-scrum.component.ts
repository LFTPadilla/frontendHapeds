import { Component, OnInit, ViewChild } from '@angular/core';
import { Board } from 'src/app/model/board';
import { Column } from 'src/app/model/column';
import { Project } from 'src/app/model/project';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { PlanningEntryPlanner } from 'src/app/model/planning-entry-planner';
import { TaskTypes } from 'src/app/model/task-types.enum';
import { AgileStates } from 'src/app/model/agile-states.enum';

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

  @ViewChild( 'ModalEditIteration',{static: false} ) modalEditIteration;
  taskTypes = TaskTypes;
  agileStates = AgileStates;

  constructor() { }

  board: Board = new Board('Semana 3 (28Jul-31Jul)', [
    new Column('PLANEADO', [
      new PlanningEntryPlanner("WEB600 Formulario Envi",this.taskTypes.Develop,1,this.agileStates.Planned),
      new PlanningEntryPlanner("WEB601 Form recibir ma",this.taskTypes.Develop,1,this.agileStates.Planned),
      new PlanningEntryPlanner("WEB601 Form gestión",this.taskTypes.Develop,1,this.agileStates.Planned)
    ]),
    new Column('EN PROGRESO', [
      new PlanningEntryPlanner("WEB410 Cambio Form Be",this.taskTypes.Develop,1,this.agileStates.Planned),
      new PlanningEntryPlanner("WEB430 Cambio Traslad",this.taskTypes.Develop,1,this.agileStates.Planned)
    ]),
    new Column('EN REVISIÓN', [
    ]),
    new Column('FINALIZADO', [
    ])
  ]);


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  NewIteration(){
    this.modalEditIteration.LaunchModal(); //Esta como sabe a donde apunta? R:/ Ya sé, por el # en el html
  }

  LaunchModalTagTask() {
    console.log("Se abre el modal de targeta de tarea")
  }

  ngOnInit(): void {
  }

}
