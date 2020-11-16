import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TasksBusinessService } from 'src/app/business/master/tasks-business.service';
import { AgileStates } from 'src/app/model/agile-states.enum';
import { IterationTask } from 'src/app/model/iteration-task';
import { IterationTaskTypes } from 'src/app/model/iteration-task-types.enum';
import { Requirement } from 'src/app/model/Requirement';
import { TaskProxy } from 'src/app/model/task-proxy';
import Swal from 'sweetalert2';
import { RequirementEditComponent } from '../requirement-edit/requirement-edit.component';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.scss']
})
export class TaskEditComponent implements OnInit {


  TaskOpened=new IterationTask(null, null);
  TaskProxyOpened=new TaskProxy();
  Requirements: Requirement[]=[];
  RequirementSelected: Requirement;

  @ViewChild( 'ModalEdit', {static:false}) modalEdit;
  constructor(private modalService: NgbModal, private tasksBussines: TasksBusinessService) { 
    this.GetRequirements();
  }

  LaunchModal(projectId: string, iterationcode:string){
    this.TaskOpened.ProjectId = projectId;
    this.TaskOpened.IterationCode = iterationcode;
    this.modalService.open(this.modalEdit, {ariaLabelledBy: 'modal-basic-title', size:'xl'});
  }

  SaveTask(){
    this.TaskOpened.TaskType = IterationTaskTypes.Develop; //Esta toca ponerla con combobox
    this.TaskOpened.State = AgileStates.Planned;          //Esta se mantiene siempre en planned al crear una task
    this.TaskOpened.RealEffort=0.0;
    this.TaskOpened.RealHours=0.0;
    this.TaskOpened.Creation="";
    this.TaskOpened.Edition="";
    this.TaskOpened.RequirementId = this.RequirementSelected.RequirementId
    this.tasksBussines.SaveTask(this.TaskOpened)
    .then( x => {
      this.modalService.dismissAll('Save');
      console.log("Se guardó correctamente la tarea"+x);
    }).catch(x => {
      console.log("Error"+x)
      Swal.fire({
        title: 'Advertencia',
        text: 'No fue posible guardar la Tarea. Revise que el código no esté repetido',
        icon: 'warning',
        confirmButtonText: 'Cerrar'
      });
    })
  }

  GetRequirements(){
    this.tasksBussines.GetRequirements()
      .then(x => {
        this.Requirements = x;
        console.log("Se cargaron correctamente los Requerimientos" + x);
      }).catch(x => {
        console.log("error en los Requerimientos" + x)
      })
  }
  ngOnInit(): void {
  }

}