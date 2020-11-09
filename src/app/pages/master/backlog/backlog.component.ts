import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequirementsBusinessService } from 'src/app/business/master/requirements-business.service';

import { Requirement } from 'src/app/model/Requirement';

@Component({
  selector: 'app-backlog',
  templateUrl: './backlog.component.html',
  styleUrls: ['./backlog.component.scss']
})
export class BacklogComponent implements OnInit {


  @ViewChild( 'ModalEditRequirement',{static: false} ) modalEditRequirement;

  backlog: Requirement[] = [];
  closeResult = '';

  constructor(private requirementBussines: RequirementsBusinessService ) {
    this.GetRequirements();
  }


  GetRequirements(){
    let idPro = "3";
    this.requirementBussines.GetRequirements(idPro).then(x=> {
      this.backlog = x
      console.log("Se cargó correctamente el Backlog "+x);
    }).catch(x => {
      console.log("error "+x)
    });
  }

  LauchModal(reqId: string) {
    //Buscar objeto local
    let reqObj = this.backlog.filter(x=>{
      return x.RequirementId==reqId;
    })[0];

    this.modalEditRequirement.LauchModal(reqObj);

  }

  ngOnInit(): void {

  }

}
