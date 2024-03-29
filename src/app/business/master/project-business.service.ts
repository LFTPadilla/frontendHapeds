import { Injectable } from '@angular/core';
import { Project } from 'src/app/model/project';
import { ServiceObject } from 'src/app/model/service-object';
import { ApiGatewayService } from '../services/api-gateway.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectBusinessService {

  constructor(private apiGatewayService: ApiGatewayService)  { }


  public GetProjects(): Promise<Project[]> {
    let serviceObj = new ServiceObject("ProjectService", 'Project', 'GetProjects');

    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
/*         //console.log(x);
        serviceObj = x as ServiceObject;
        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }
        const projects = serviceObj.Data as Project[]; */
        return x;
      })
      .catch(x => {
        throw x
      });
  }

  public SaveProject(project: Project): Promise<number> {

    let serviceObject = new ServiceObject('Hapeds', 'Projects', 'SaveProject');
    serviceObject.Data = { project };

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


}
