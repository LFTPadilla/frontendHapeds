import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequirementsBusinessService } from 'src/app/business/master/requirements-business.service';
import { Requirement } from 'src/app/model/Requirement';

@Component({
  selector: 'app-requirement-edit',
  templateUrl: './requirement-edit.component.html',
  styleUrls: ['./requirement-edit.component.scss']
})
export class RequirementEditComponent implements OnInit {

  RequirementOpened=new Requirement();

  @Output() OnSaveEvent = new EventEmitter<boolean>();

  @ViewChild( 'ModalEdit',{static: false} ) modalEdit;

  constructor(private modalService: NgbModal,private requirementBussines: RequirementsBusinessService  ) { }

  LaunchModal(req: Requirement) {
    Object.assign(this.RequirementOpened,req);

    this.modalService.open(this.modalEdit, {ariaLabelledBy: 'modal-basic-title'});
  }

  SaveRequirement(){

    this.requirementBussines.SaveRequirement(this.RequirementOpened).then(x=> {
      this.modalService.dismissAll('Save');
      this.OnSaveEvent.emit();
      //console.log("Se guardo correctamente el Backlog "+x);
    }).catch(x => {
      //console.log("error "+x)
    });

  }

  ngOnInit(): void {
  }

}
