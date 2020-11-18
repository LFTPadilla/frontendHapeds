import { Component, OnInit, ViewChild } from '@angular/core';
import { RequirementsBusinessService } from 'src/app/business/master/requirements-business.service';
import { Requirement } from 'src/app/model/Requirement';

@Component({
  selector: 'app-requirements',
  templateUrl: './requirements.component.html',
  styleUrls: ['./requirements.component.scss']
})
export class RequirementsComponent implements OnInit {

  @ViewChild( 'ModalEditRequirement',{static: false} ) modalEditRequirement;

  requirements: Requirement[] = [];
  closeResult = '';

  constructor(private requirementBussines: RequirementsBusinessService ) {
    this.GetRequirements();
  }


  GetRequirements(){
    let idReq = "3";
    this.requirementBussines.GetRequirements().then(x=> {
      this.requirements = x
      //console.log("Se cargaron correctamente los requirements "+x);
    }).catch(x => {
      //console.log("error "+x)
    });
  }

  LaunchModal(reqId: string) {
    //Buscar objeto local
    let reqObj = this.requirements.filter(x=>{
      return x.RequirementId==reqId;
    })[0];

    this.modalEditRequirement.LaunchModal(reqObj);

  }

  ngOnInit(): void {

  }


}
