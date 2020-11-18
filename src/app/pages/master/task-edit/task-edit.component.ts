import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TasksBusinessService } from 'src/app/business/master/tasks-business.service';
import { AgileStates } from 'src/app/model/agile-states.enum';
import { IterationTask } from 'src/app/model/iteration-task';
import { IterationTaskTypes } from 'src/app/model/iteration-task-types.enum';
import { KeyValuePair } from 'src/app/model/key-value-pair';
import { Project } from 'src/app/model/project';
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


  TaskOpened: IterationTask;
  TaskProxyOpened: TaskProxy;
  Requirements: Requirement[]=[];
  RequirementSelected: Requirement;
  ProjectSelected: string;

  @ViewChild( 'ModalEdit', {static:false}) modalEdit;
  @Output() OnSaveTask = new EventEmitter<boolean>();

  TaskTypes: KeyValuePair[] = [ { "Key": 1,"Value": "Diseño" },{ "Key": 2,"Value": "Requerimientos" },{ "Key": 3,"Value": "Desarrollo" },{ "Key": 4,"Value": "Pruebas" },{ "Key": 5,"Value": "Despliegue" },{ "Key": 6,"Value": "Administración" },{ "Key": 7,"Value": "Arreglo de errores" } ];



  constructor(private modalService: NgbModal, private tasksBussines: TasksBusinessService) {

  }

  LaunchModal(projectId: string, iterationcode:string){
    this.TaskOpened =new IterationTask(null, null);
    this.TaskOpened.ProjectId = projectId;
    this.TaskOpened.IterationCode = iterationcode;
    this.TaskProxyOpened = new TaskProxy();
    this.ProjectSelected = projectId;
    this.GetRequirements();
    this.modalService.open(this.modalEdit, {ariaLabelledBy: 'modal-basic-title', size:'xl'});

  }

  SaveTask(taskForm:NgForm){

    taskForm.form.markAllAsTouched();
    if(taskForm.invalid){
      Swal.fire({
        title: 'Advertencia',
        text: 'Complete los campos obligatorios (*)',
        icon: 'warning',
        confirmButtonText: 'Cerrar'
      });
      return;
    }

    //this.TaskOpened.TaskType = IterationTaskTypes.Develop; //Esta toca ponerla con combobox
    this.TaskOpened.State = AgileStates.Planned;          //Esta se mantiene siempre en planned al crear una task
    this.TaskOpened.RealEffort=0.0;
    this.TaskOpened.RealHours=0.0;
    this.TaskOpened.Creation="";
    this.TaskOpened.Edition="";
    this.TaskOpened.RequirementId = this.RequirementSelected.RequirementId
    this.tasksBussines.SaveTask(this.TaskOpened)
    .then( x => {
      this.OnSaveTask.emit();
      this.modalService.dismissAll('Save');
      taskForm.form.reset();
      //console.log("Se guardó correctamente la tarea"+x);
    }).catch(x => {
      //console.log("Error"+x)
      Swal.fire({
        title: 'Advertencia',
        text: 'No fue posible guardar la Tarea. Revise que el código no esté repetido',
        icon: 'warning',
        confirmButtonText: 'Cerrar'
      });
    })
  }

  GetRequirements(){
    this.tasksBussines.GetRequirements(this.ProjectSelected)
      .then(x => {
        this.Requirements = x;
        //console.log("Se cargaron correctamente los Requerimientos" + x);
      }).catch(x => {
        //console.log("error en los Requerimientos" + x)
      })
  }

  CloseModal(taskF: NgForm){
    this.modalService.dismissAll('Cross click');
    taskF.form.reset();
  }
  ngOnInit(): void {
  }

}
