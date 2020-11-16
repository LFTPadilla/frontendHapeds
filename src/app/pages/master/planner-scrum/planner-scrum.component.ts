import { Component, OnInit, ViewChild } from '@angular/core';
import { Board } from 'src/app/model/board';
import { Column } from 'src/app/model/column';
import { Project } from 'src/app/model/project';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { PlanningEntryPlanner } from 'src/app/model/planning-entry-planner';
import { PlanningEntry } from 'src/app/model/planning-entry';
import { IterationTaskTypes } from 'src/app/model/iteration-task-types.enum';
import { AgileStates } from 'src/app/model/agile-states.enum';
import { IterationTask } from 'src/app/model/iteration-task';
import { Iteration } from 'src/app/model/Iteration';
import { IterationsBusinessService } from 'src/app/business/master/iterations-business.service';
import Swal from 'sweetalert2';
import * as moment from 'moment';
import { PlanningPeriod } from 'src/app/model/planning-period';


@Component({
  selector: 'app-planner-scrum',
  templateUrl: './planner-scrum.component.html',
  styleUrls: ['./planner-scrum.component.scss']
})
export class PlannerScrumComponent implements OnInit {

  ProjectSelected:Project = null;
  Projects:Project[] = [ new Project("4145","title" ) ];

  IterationSelected: Iteration = new Iteration();
  Iterations: Iteration[] = [];
  IterationBoards: Board[] = [];




  @ViewChild( 'ModalEditIteration',{static: false} ) modalEditIteration;
  taskTypes = IterationTaskTypes;
  agileStates = AgileStates;

  boardSelected: Board = new Board('Loading',new Date(),new Date(),[new Column('LOADING', [])]);
  WeekPosition: number = 0;

  constructor(private iterationBussines : IterationsBusinessService) {
    moment.locale('es');
    let it1 = new IterationTask("code1","Tarea 1");
    let p1 = new PlanningEntry()
    p1.State = this.agileStates.Planned;
    p1.PlannedHours = 20;
    p1.Period = new PlanningPeriod(1,"Periodo ",new Date("01/09/2020"),new Date("01/12/2020"));
    let p2 = new PlanningEntry()
    p2.State = this.agileStates.InProgress;
    p2.PlannedHours = 12;
    p2.Period = new PlanningPeriod(1,"Periodo ",new Date("01/17/2020"),new Date("01/12/2020"));
    it1.Planning = [p1,p2];

    let it2 = new IterationTask("code2","Tarea 2");
    let p3 = new PlanningEntry()
    p3.State = this.agileStates.InReview;
    p3.PlannedHours = 29;
    p3.Period = new PlanningPeriod(1,"Periodo ",new Date("01/29/2020"),new Date("01/24/2020"));
    let p4 = new PlanningEntry()
    p4.State = this.agileStates.Done;
    p4.PlannedHours = 66;
    p4.Period = new PlanningPeriod(1,"Periodo ",new Date("01/26/2020"),new Date("01/12/2020"));
    it2.Planning = [p3,p4];


    this.IterationSelected.Tasks.push(it1);
    this.IterationSelected.Tasks.push(it2);
    this.IterationSelected.StartDate = new Date("01/08/2020");
    this.IterationSelected.PlannedEndDate = new Date("02/12/2020");

    this.LoadBoards();
    this.boardSelected = this.IterationBoards[this.WeekPosition];


    this.GetIterations();
   }

   LoadBoards(){

    let Days = (this.IterationSelected.PlannedEndDate.getTime() -this.IterationSelected.StartDate.getTime() )/(1000*60*60*24);

    let Weeks =  Math.ceil(Days/7);
    console.log("Semanas",Weeks)

    for (var i=1; i <= Weeks;i++){
      let StartWeek = new Date(this.IterationSelected.StartDate);
      StartWeek.setDate(this.IterationSelected.StartDate.getDate() + (i-1)*7+(i!=1?1:0));
      let EndWeek = new Date(this.IterationSelected.StartDate);

      EndWeek.setDate(StartWeek.getDate()+ (i-1)*7+ (i==Weeks?Days-(i-1)*7:7));


      let board = new Board("Semana "+i+" ( "+moment(StartWeek).format("Do MMM")+" - "+moment(EndWeek).format("Do MMM")+")",StartWeek, EndWeek, [
        new Column('PLANEADO', []),
        new Column('EN PROGRESO', []),
        new Column('EN REVISIÓN', []),
        new Column('FINALIZADO', [])
      ]);
      this.IterationBoards.push(board);
    }

    this.IterationSelected.Tasks.forEach(iterTasks =>{
      iterTasks.Planning.forEach(planning =>{
        planning.Period.StartDate.getTime()
        this.IterationBoards.forEach(planningBoard=>{
          console.log(planningBoard.name,planningBoard.startDate,planningBoard.startDate.getDate()< planning.Period.StartDate.getDate(),planningBoard.endDate.getDate()> planning.Period.StartDate.getDate());
          if(planningBoard.startDate.getDate()< planning.Period.StartDate.getDate() && planningBoard.endDate.getDate()> planning.Period.StartDate.getDate()){

            let planningP = new PlanningEntryPlanner(iterTasks.Code,iterTasks.Title,iterTasks.TaskType,planning.PlannedEffort,planning.State);
            planningBoard.columns[0].tasks.push(planningP);
          }
        })

      })
    });

   }

  ChangeWeek(action: number){
    this.WeekPosition+=action;
    this.boardSelected = this.IterationBoards[this.WeekPosition];
  }



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
    this.boardSelected.columns.forEach(row =>{
      row.tasks.forEach(task =>{
        console.log(task.Code == planning.Code,task.Code, planning.Code)
        if(task.Code == planning.Code){
          exist = true
        }
      });
    });
    if(!exist){
      this.boardSelected.columns[planning.State].tasks.push(planning);
    }else{
      Swal.fire('Error', "No puede crear dos tareas iguales en la misma semana.", 'error');
    }

  }

  GetIterations(){
    this.iterationBussines.GetIterations()
    .then(x => {
      this.Iterations = x;
      console.log("Se cargaron correctamente las iteraciones"+x);
    }).catch(x => {
      console.log("error en las iteraciones"+x)
    })
  }
  NewIteration(){
    console.log("Project"+this.ProjectSelected != null)//null != null True
    console.log("Project"+this.ProjectSelected)
    if (this.ProjectSelected != null){
      this.modalEditIteration.LaunchModal(this.ProjectSelected.ProjectId); //Esta como sabe a donde apunta? R:/ Ya sé, por el # en el html JAJAJAJAJAJA

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
