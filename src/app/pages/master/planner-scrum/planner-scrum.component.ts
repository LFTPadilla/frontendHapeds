import { Component, OnInit, ViewChild } from '@angular/core';
import { Board } from 'src/app/model/board';
import { Column } from 'src/app/model/column';
import { Project } from 'src/app/model/project';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { PlanningEntryPlanner } from 'src/app/model/planning-entry-planner';
import { IterationTaskTypes } from 'src/app/model/iteration-task-types.enum';
import { AgileStates } from 'src/app/model/agile-states.enum';
import { IterationTask } from 'src/app/model/iteration-task';
import { Iteration } from 'src/app/model/Iteration';
import { IterationsBusinessService } from 'src/app/business/master/iterations-business.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-planner-scrum',
  templateUrl: './planner-scrum.component.html',
  styleUrls: ['./planner-scrum.component.scss']
})
export class PlannerScrumComponent implements OnInit {

  ProjectSelected:Project = null;
  Projects:Project[] = [ new Project("4145","title" ) ];
  IterationSelected:Iteration;
  iterations: Iteration[] = [];

  iterationTasks: IterationTask[] = [new IterationTask("code1","Tarea 1"),new IterationTask("code2","Tarea 2")];



  @ViewChild( 'ModalEditIteration',{static: false} ) modalEditIteration;
  taskTypes = IterationTaskTypes;
  agileStates = AgileStates;

  constructor(private iterationBussines : IterationsBusinessService) {
    this.GetIterations();
   }

  board: Board = new Board('Semana 3 (28Jul-31Jul)', [
    new Column('PLANEADO', [
      new PlanningEntryPlanner("1","WEB600 Formulario Envi",this.taskTypes.Develop,1,this.agileStates.Planned),
      new PlanningEntryPlanner("2","WEB601 Form recibir ma",this.taskTypes.Develop,1,this.agileStates.Planned),
      new PlanningEntryPlanner("3","WEB601 Form gestión",this.taskTypes.Develop,1,this.agileStates.Planned)
    ]),
    new Column('EN PROGRESO', [
      new PlanningEntryPlanner("4","WEB410 Cambio Form Be",this.taskTypes.Develop,1,this.agileStates.InProgress),
      new PlanningEntryPlanner("5","WEB430 Cambio Traslad",this.taskTypes.Develop,1,this.agileStates.InProgress)
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

  AddTasktoWeek(task: IterationTask){
    let planning = new PlanningEntryPlanner(task.Code, task.Title,task.TaskType,task.PlannedEffort,this.agileStates.Planned)
    this.PutNewPlanningInBoard(planning);
  }

  PutNewPlanningInBoard(planning: PlanningEntryPlanner){
    let exist = false;
    this.board.columns.forEach(row =>{
      row.tasks.forEach(task =>{
        console.log(task.Code == planning.Code,task.Code, planning.Code)
        if(task.Code == planning.Code){
          exist = true
        }
      });
    });
    if(!exist){
      this.board.columns[planning.State].tasks.push(planning);
    }else{
      Swal.fire('Error', "No puede crear dos tareas iguales en la misma semana.", 'error');
    }

  }

  GetIterations(){
    this.iterationBussines.GetIterations()
    .then(x => {
      this.iterations = x;
      console.log("Se cargaron correctamente las iteraciones"+x);
    }).catch(x => {
      console.log("error en las iteraciones"+x)
    })
  }
  NewIteration(){
    console.log("Project"+this.ProjectSelected != null)//null != null True
    console.log("Project"+this.ProjectSelected)
    if (this.ProjectSelected != null){
      this.modalEditIteration.LaunchModal(this.ProjectSelected.ProjectId); //Esta como sabe a donde apunta? R:/ Ya sé, por el # en el html

    }else{
      Swal.fire({
        title: 'Advertencia',
        text: 'Por favor seleccione un proyecto',
        icon: 'warning',
        confirmButtonText: 'Cerrar'
      });

    }
  }

  LaunchModalTagTask() {
    console.log("Se abre el modal de targeta de tarea")
  }

  ngOnInit(): void {
  }

}
