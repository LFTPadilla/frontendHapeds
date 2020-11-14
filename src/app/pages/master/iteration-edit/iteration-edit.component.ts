import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Iteration } from 'src/app/model/Iteration';
import { Requirement } from 'src/app/model/Requirement';

@Component({
  selector: 'app-iteration-edit',
  templateUrl: './iteration-edit.component.html',
  styleUrls: ['./iteration-edit.component.scss']
})
export class IterationEditComponent implements OnInit {

  IterationOpened=new Iteration();

  @ViewChild( 'ModalEdit',{static: false} ) modalEdit;
  constructor(private modalService: NgbModal,/*private requirementBussines: RequirementsBusinessService*/) { }


  LaunchModal(/*req: Requirement*/) {
    //Object.assign(this.IterationOpened,req);

    this.modalService.open(this.modalEdit, {ariaLabelledBy: 'modal-basic-title'});
  }
/* 
  SaveRequirement(){

    this.requirementBussines.SaveRequirement(this.IterationOpened).then(x=> {
      this.modalService.dismissAll('Save');
      this.OnSaveEvent.emit();
      console.log("Se guardo correctamente el Backlog "+x);
    }).catch(x => {
      console.log("error "+x)
    });

  }
 */
  ngOnInit(): void {
  }

}
