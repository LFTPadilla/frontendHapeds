import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PlanningEntry } from 'src/app/model/planning-entry';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-planning-entry-edit',
  templateUrl: './planning-entry-edit.component.html',
  styleUrls: ['./planning-entry-edit.component.scss']
})
export class PlanningEntryEditComponent implements OnInit {

  PlanningEntryOpened: PlanningEntry = new PlanningEntry(null, null, null, null);
  @ViewChild( 'ModalEdit', {static:false}) modalEdit;

  constructor(private modalService: NgbModal) { }


  LaunchModal(){
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
  }

  CloseModal(taskF: NgForm){
    this.modalService.dismissAll('Cross click');
    taskF.form.reset();
  }

  ngOnInit(): void {
  }

}
