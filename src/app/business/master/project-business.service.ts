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
    let serviceObj = new ServiceObject("ProjectService", 'Project', 'list-projects');
    let proy = new Project()
    proy.Title = "Un proyecto sin alma porque es falso"
    proy.ProjectId = "Proyecto Fantasma"
    return Promise.resolve([proy] as Project[])
    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        console.log(x);
        serviceObj = x as ServiceObject;
        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }
        const projects = serviceObj.Data as Project[];
        return projects;
      })
      .catch(x => {
        throw x
      });
  }


}
