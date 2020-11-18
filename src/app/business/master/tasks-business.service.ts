import { Injectable } from '@angular/core';
import { ServiceObject } from 'src/app/model/service-object';
import { ApiGatewayService } from '../services/api-gateway.service';
import { Requirement } from 'src/app/model/Requirement';
import { IterationTask } from 'src/app/model/iteration-task';

@Injectable({
  providedIn: 'root'
})
export class TasksBusinessService {

  constructor(private apiGatewayService: ApiGatewayService) { }


  public GetTasks(projectId: string, iterationCode: string): Promise<IterationTask[]> {
    let serviceObj = new ServiceObject("Hapeds", 'Tasks', 'GetTasks');
    serviceObj.Data = { projectId, iterationCode }
    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        const tasks = x as IterationTask[];
        return tasks;
      })
      .catch(x => {
        throw x
      });
  }

  public SaveTask(task: IterationTask): Promise<number> {

    let serviceObject = new ServiceObject('Hapeds', 'Tasks', 'SaveTask');
    serviceObject.Data = { task };

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


}
