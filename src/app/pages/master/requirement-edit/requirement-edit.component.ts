import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProjectBusinessService } from 'src/app/business/master/project-business.service';
import { RequirementsBusinessService } from 'src/app/business/master/requirements-business.service';
import { Project } from 'src/app/model/project';
import { Requirement } from 'src/app/model/Requirement';

@Component({
  selector: 'app-requirement-edit',
  templateUrl: './requirement-edit.component.html',
  styleUrls: ['./requirement-edit.component.scss']
})
export class RequirementEditComponent implements OnInit {

  RequirementOpened=new Requirement();
  Projects: Project[] = [];
  ProjectSelected:  Project = null;

  @Output() OnSaveEvent = new EventEmitter<boolean>();

  @ViewChild( 'ModalEdit',{static: false} ) modalEdit;

  constructor(private modalService: NgbModal,private requirementBussines: RequirementsBusinessService,
    private projectBussines: ProjectBusinessService ) { 
      this.GetProjects();
    }

  LaunchModal(req: Requirement) {
    Object.assign(this.RequirementOpened,req);
    this.modalService.open(this.modalEdit, {ariaLabelledBy: 'modal-basic-title'});
  }

  LaunchModalCreate() {
    this.RequirementOpened = new Requirement();
    this.modalService.open(this.modalEdit, {ariaLabelledBy: 'modal-basic-title'});
  }

  SaveRequirement(){

    this.RequirementOpened.ProjectId = this.ProjectSelected.ProjectId
    this.requirementBussines.SaveRequirement(this.RequirementOpened).then(x=> {
      this.modalService.dismissAll('Save');
      this.OnSaveEvent.emit();
      //console.log("Se guardo correctamente el Backlog "+x);
    }).catch(x => {
      //console.log("error "+x)
    });

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

  ngOnInit(): void {
  }

}
