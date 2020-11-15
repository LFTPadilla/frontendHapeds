import { Component, OnInit, ViewChild } from '@angular/core';
import { Board } from 'src/app/model/board';
import { Column } from 'src/app/model/column';
import { Project } from 'src/app/model/project';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

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


  constructor() { }

  board: Board = new Board('Semana 3 (28Jul-31Jul)', [
    new Column('PLANEADO', [
      "WEB600 Formulario Envi",
      "WEB601 Form recibir ma",
      "WEB601 Form gestión"
    ]),
    new Column('EN PROGRESO', [
      "WEB410 Cambio Form Be",
      "WEB430 Cambio Traslad",
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
