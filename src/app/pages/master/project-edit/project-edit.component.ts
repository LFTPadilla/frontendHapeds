import { Component, EventEmitter, OnInit, Output, ViewChild, ɵSWITCH_TEMPLATE_REF_FACTORY__POST_R3__ } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectBusinessService } from 'src/app/business/master/project-business.service';
import { Project } from 'src/app/model/project';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {

  public ProjectOpened = new Project(null, null);
  isNew = true;

  @Output() OnSaveProjectEvent = new EventEmitter<boolean>();
  @ViewChild('ModalEdit',{static:false}) modalEdit;

  StatesProyect:any = [
    {'name':'Activo', 'value': true},
    {'name':'Inactivo', 'value': false}
  ]

  constructor(private modalService: NgbModal, private projectBussines: ProjectBusinessService) { }

  LaunchModal(isNew){
    this.isNew = isNew;
    if(isNew){
      this.ProjectOpened = new Project(null, null);
    }
    this.modalService.open(this.modalEdit, {ariaLabelledBy: 'modal-basic-title', size:'xl'});
  }

  SaveProject(){

    this.projectBussines.SaveProject(this.ProjectOpened).then(x=> {
      this.modalService.dismissAll('Save');
      this.OnSaveProjectEvent.emit();
      //console.log("Se guardo correctamente el Proyecto "+x);
    }).catch(x => {
      //console.log("error "+x)
    });

  }


  ngOnInit(): void {
  }

}
