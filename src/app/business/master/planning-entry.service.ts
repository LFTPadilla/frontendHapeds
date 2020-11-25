import { Injectable } from '@angular/core';
import { ServiceObject } from 'src/app/model/service-object';
import { ApiGatewayService } from '../services/api-gateway.service';
import { Requirement } from 'src/app/model/Requirement';
import { IterationTask } from 'src/app/model/iteration-task';
import { PlanningEntry } from 'src/app/model/planning-entry';
import { AgileStates } from 'src/app/model/agile-states.enum';

@Injectable({
  providedIn: 'root'
})
export class PlanningEntryService {


  constructor(private apiGatewayService: ApiGatewayService) { }


  public GetPlanningEntries(projectId: string, iterationCode: string, iterationTaskCode: string): Promise<PlanningEntry[]> {
    let serviceObj = new ServiceObject("Hapeds", 'PlanningEntries', 'GetPlanningEntries');
    serviceObj.Data = { projectId, iterationCode, iterationTaskCode }
    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        const pEntries = x as PlanningEntry[];
        return pEntries;
      })
      .catch(x => {
        throw x
      });
  }

  public CreatePlanningEntry(planningEntry: PlanningEntry): Promise<number> {

    let serviceObject = new ServiceObject('Hapeds', 'PlanningEntries', 'SavePlanningEntry');
    serviceObject.Data = { planningEntry };

    return this.apiGatewayService.PostAction(serviceObject)
      .then(x => {
       /*  serviceObject = x as ServiceObject;
        if (!serviceObject.Success) {
          throw new Error(serviceObject.Message);
        } */
        return x.Data;
      })
      .catch(x => {
        throw x.message;
      });
  }

  ChangeStatePlanningEntry(idPlanningEntry, columnState) {
    let serviceObj = new ServiceObject("Hapeds", 'PlanningEntries', 'ChangeStatePlanningEntry');
    serviceObj.Data = { id: idPlanningEntry, state: columnState }
    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        return x;
      })
      .catch(x => {
        throw x
      });
  }

  public GetRequirements(projectId: string ): Promise<Requirement[]> {
    let serviceObj = new ServiceObject("Hapeds", 'Requirement', 'GetRequirements');
    serviceObj.Data = { projectId }
    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        const reqs = x as Requirement[];
        return reqs;
      })
      .catch(x => {
        throw x
      });
  }

  public SaveNewStatePlanningEntry(pEntryId:string, taskcode:string, iterationCode: string, projectId: string, state: AgileStates): Promise<number> {
    let serviceObject = new ServiceObject('Hapeds', 'PlanningEntries', 'SaveNewStatePlanningEntry');
    serviceObject.Data = {pEntryId, taskcode, iterationCode, projectId, state};

    return this.apiGatewayService.PostAction(serviceObject)
    .then(x => {
      /* SObject */
      return x.Data;
    })
    .catch(x =>{
      throw x.message;
    })

    }



}
