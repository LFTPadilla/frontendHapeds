import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectBusinessService } from 'src/app/business/master/project-business.service';
import { Project } from 'src/app/model/project';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.scss']
})
export class ProjectEditComponent implements OnInit {

  ProjectOpened = new Project(null, null);

  @Output() OnSaveProjectEvent = new EventEmitter<boolean>();
  @ViewChild('ModalEdit',{static:false}) modalEdit;
  constructor(private modalService: NgbModal, private projectBussines: ProjectBusinessService) { }

  LaunchModal(){
    this.modalService.open(this.modalEdit, {ariaLabelledBy: 'modal-basic-title', size:'xl'});
  }

  SaveProject(){

    this.projectBussines.SaveProject(this.ProjectOpened).then(x=> {
      this.modalService.dismissAll('Save');
      this.OnSaveProjectEvent.emit();
      console.log("Se guardo correctamente el Proyecto "+x);
    }).catch(x => {
      console.log("error "+x)
    });

  }

  ngOnInit(): void {
  }

}
