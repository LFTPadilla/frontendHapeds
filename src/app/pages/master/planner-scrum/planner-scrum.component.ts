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

import { ProjectBusinessService } from 'src/app/business/master/project-business.service';
import { TasksBusinessService } from 'src/app/business/master/tasks-business.service';
import { KeyValuePair } from 'src/app/model/key-value-pair';
import { PlanningEntryService } from 'src/app/business/master/planning-entry.service';

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

  @ViewChild('ModalEditIteration', { static: false }) modalEditIteration;
  @ViewChild('ModalEditProject', { static: false }) modalEditProject;
  @ViewChild('ModalEditTask', { static: false }) modalEditTask;
  @ViewChild('ModalEditPlanningEntry', {static:false}) modalEditPlanningEntry;

  taskTypes = IterationTaskTypes;
  agileStates = AgileStates;
  tasksInfo = "";

  boardSelected: Board = new Board('Loading',new Date(),new Date(),[new Column('LOADING', [])]);
  WeekPosition: number = 0;

  TaskTypes: KeyValuePair[] = [ { "Key": 1,"Value": "Diseño" },{ "Key": 2,"Value": "Requerimientos" },{ "Key": 3,"Value": "Desarrollo" },{ "Key": 4,"Value": "Pruebas" },{ "Key": 5,"Value": "Despliegue" },{ "Key": 6,"Value": "Administración" },{ "Key": 7,"Value": "Arreglo de errores" } ];

  constructor(private iterationBussines : IterationsBusinessService, private projectBussines: ProjectBusinessService,
     private taskBussines: TasksBusinessService, private planningEntryBussines: PlanningEntryService) {
    moment.locale('es');
    let it1 = new IterationTask("code1","Tarea 1");
    let p1 = new PlanningEntry(null, null, null, null)
    p1.State = this.agileStates.Planned;
    p1.PlannedHours = 20;

    let p2 = new PlanningEntry(null, null, null, null)
    p2.State = this.agileStates.InProgress;
    p2.PlannedHours = 12;

    it1.Planning = [p1,p2];

    let it2 = new IterationTask("code2","Tarea 2");
    let p3 = new PlanningEntry(null, null, null, null)
    p3.State = this.agileStates.InReview;
    p3.PlannedHours = 29;

    let p4 = new PlanningEntry(null, null, null, null)
    p4.State = this.agileStates.Done;
    p4.PlannedHours = 66;

    it2.Planning = [p3,p4];


    this.IterationSelected.Tasks.push(it1);
    this.IterationSelected.Tasks.push(it2);
    this.IterationSelected.StartDate = new Date("11/01/2020");
    this.IterationSelected.PlannedEndDate = new Date("11/31/2020");

    this.LoadBoards();
    this.boardSelected = this.IterationBoards[this.WeekPosition];

    this.GetProjects();
  }

  LoadBoards(){
    console.log("ITERACION",this.IterationSelected)
    this.IterationBoards = [];
    let iterStarD = new Date(this.IterationSelected.StartDate);
    let iterEndD = moment(this.IterationSelected.PlannedEndDate);
    let Days = iterEndD.diff(moment(iterStarD), "days");//(new Date(this.IterationSelected.PlannedEndDate).getTime() -iterStarD.getTime() )/(1000*60*60*24);

    let Weeks =  Math.ceil(Days/7);
    //console.log("Semanas",Weeks)

    for (var i=1; i <= Weeks;i++){
      let StartWeek = iterStarD;
      /*
        Inicio de semana es a la fecha de inicio de iteración más la semana posicion de la semana
      */
      StartWeek.setDate(iterStarD.getDate() + (i-1)*7+(i!=1?1:0));

      /*
      Fin de la semana es el inicio de la semana más 7 días, excepto la utlima semana que son los días sobrantes
      */
      let EndWeek = new Date(StartWeek);
      //console.log(i,Weeks,Days,(i-1)*7,Days-(i-1)*7, i==Weeks?Days-(i-1)*7:7)
      EndWeek.setDate(StartWeek.getDate()+ (i==Weeks?Days-(i-1)*7:7));
      console.log(i,StartWeek,EndWeek)

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
        planning.StartDate.getTime()
        this.IterationBoards.forEach((planningBoard,index)=>{


          if(planningBoard.startDate.getDate()< planning.StartDate.getDate() && planningBoard.endDate.getDate() > planning.EndDate.getDate()){

            let planningP = new PlanningEntryPlanner(iterTasks.IterationTaskCode,iterTasks.Title,iterTasks.TaskType,planning.PlannedEffort,planning.State);
            planningBoard.columns[planning.State-7].tasks.push(planningP);
            /* switch (planning.State) {
              case 7:
                break;
              default:
                break;
            } */
          }
        })

      })
    });

    this.boardSelected = this.IterationBoards[0];

   }

  ChangeWeek(action: number){
    this.WeekPosition+=action;
    this.boardSelected = this.IterationBoards[this.WeekPosition];
  }



  drop(event: CdkDragDrop<string[]>, columnName: string) {
    //console.log("antes",columnName,event.item.data);
    //En caso de que se mueva en el mismo contenedor
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      //En caso de que cambie contenedor
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    //console.log("despues",event);
  }

  ChangeTask(event,Title){


  }

  AddTasktoWeek(task: IterationTask) {
    let planning = new PlanningEntryPlanner(task.IterationTaskCode, task.Title, task.TaskType, task.PlannedEffort, this.agileStates.Planned)
    this.PutNewPlanningInBoard(planning);
    this.CreatePlanningEntry(task);
  }

  PutNewPlanningInBoard(planning: PlanningEntryPlanner) {
    let exist = false;
    this.boardSelected.columns.forEach(row =>{
      row.tasks.forEach(task =>{
        //console.log(task.Code == planning.Code,task.Code, planning.Code)
        if(task.Code == planning.Code){
          exist = true
        }
      });
    });
    if(!exist){
      //console.log(planning.State)
      this.boardSelected.columns[planning.State-7].tasks.push(planning);
    }else{
      Swal.fire('Error', "No puede crear dos tareas iguales en la misma semana.", 'error');
    }
  }

  CreatePlanningEntry(task: IterationTask){
    let planningEntry = new PlanningEntry(this.agileStates.Planned, this.ProjectSelected.ProjectId,
     task.IterationTaskCode, this.IterationSelected.IterationCode);
    planningEntry.Creation = "";
    planningEntry.Edition = "";
    planningEntry.PlannedHours = 0;
    planningEntry.RealHours = 0 ;
    planningEntry.PlannedEffort = 0.0;
    planningEntry.RealEffort = 0.0;
    planningEntry.Annotation = "";
    planningEntry.Document = "";
    planningEntry.StartDate = this.boardSelected.startDate;
    planningEntry.EndDate = this.boardSelected.endDate;



    this.planningEntryBussines.CreatePlanningEntry(planningEntry);
  }

  GetTypeTask(type){
    //console.log(type,typeof(type));
    let r = this.TaskTypes.filter(x=>{
      return x.Key == type;
    });
    return r.length>0?r[0].Value:'Desarrollador';

  }

  GetIterations() {
    if(this.ProjectSelected == null){
      return;
    }
    this.iterationBussines.GetIterations(this.ProjectSelected.ProjectId)
    .then(x => {
      this.Iterations = x;
      //console.log("Se cargaron correctamente las iteraciones"+x);
    }).catch(x => {
      //console.log("error en las iteraciones"+x)
    })
  }

  NewIteration(){
    //console.log("Project"+this.ProjectSelected != null)//null != null True
    //console.log("Project"+this.ProjectSelected)
    if (this.ProjectSelected != null){
      this.modalEditIteration.LaunchModal(this.ProjectSelected.ProjectId); //Esta como sabe a donde apunta? R:/ Ya sé, por el # en el html JAJAJAJAJAJA

    } else {
      Swal.fire({
        title: 'Advertencia',
        text: 'Por favor seleccione un proyecto',
        icon: 'warning',
        confirmButtonText: 'Cerrar'
      });

    }
  }

  GetProjects() {
    this.projectBussines.GetProjects()
      .then(x => {
        this.Projects = x;
        //console.log("Se cargaron correctamente los proyectos" + x);
      }).catch(x => {
        //console.log("error en los proyectos" + x)
      })
  }
  NewProject() {
    this.modalEditProject.LaunchModal(); //Esta como sabe a donde apunta? R:/ Ya sé, por el # en el html

  }

  NewTask() {
    if (this.ProjectSelected != null && this.IterationSelected != null) {
      this.modalEditTask.LaunchModal(this.ProjectSelected.ProjectId, this.IterationSelected.IterationCode);

    } else {
      Swal.fire({
        title: 'Advertencia',
        text: 'Por favor seleccione un proyecto y una iteración',
        icon: 'warning',
        confirmButtonText: 'Cerrar'
      });

    }
  }

  GetTasks() {
    //console.log("SALEE:"+this.IterationSelected);
    if (this.IterationSelected == null){
      this.tasksInfo= "No hay Tareas para mostrar";
      this.IterationSelected = new Iteration();
      this.IterationSelected.Tasks = [];
      return;
    }
    //console.log("LA Iteración es la "+this.IterationSelected.IterationCode);
    //console.log("Y el proyecto es: "+this.IterationSelected.ProjectId);

    this.taskBussines.GetTasks(this.IterationSelected.ProjectId, this.IterationSelected.IterationCode)
    .then(x => {
      this.IterationSelected.Tasks = x;
      this.LoadBoards();
      console.log("Se cargaron correctamente las tareas"+x);
    }).catch(x => {
      console.log("error en las iteraciones"+x)
    })
  }

  EditPlanningEntry(){
    this.modalEditPlanningEntry.LaunchModal();
  }

  LaunchModalTagTask() {
    //console.log("Se abre el modal de targeta de tarea")
  }

  ngOnInit(): void {
  }

}
