import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IterationsBusinessService } from 'src/app/business/master/iterations-business.service';
import { Iteration } from 'src/app/model/Iteration';

@Component({
  selector: 'app-iteration-edit',
  templateUrl: './iteration-edit.component.html',
  styleUrls: ['./iteration-edit.component.scss']
})
export class IterationEditComponent implements OnInit {

  IterationOpened=new Iteration();
  isNew = true;
  @Output() OnSaveIterationEvent = new EventEmitter<boolean>();
  @ViewChild( 'ModalEdit',{static: false} ) modalEdit;
  constructor(private modalService: NgbModal, private iterationBussines: IterationsBusinessService) { }


  LaunchModal(projectId: string,isNew) {
    this.isNew = isNew;
    if(isNew){
      this.IterationOpened = new Iteration();
      this.IterationOpened.ProjectId = projectId;
    }
    this.modalService.open(this.modalEdit, {ariaLabelledBy: 'modal-basic-title', size:'xl'});
  }

  SaveIteration(){

    this.iterationBussines.SaveIteration(this.IterationOpened).then(x=> {
      this.modalService.dismissAll('Save');
      this.OnSaveIterationEvent.emit();
      //console.log("Se guardo correctamente el Backlog "+x);
    }).catch(x => {
      //console.log("error "+x)
    });

  }

  ngOnInit(): void {
  }

}
