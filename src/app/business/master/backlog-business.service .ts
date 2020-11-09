import { Injectable } from '@angular/core';
import { Requirement } from 'src/app/model/Requirement';
import { ServiceObject } from 'src/app/model/service-object';
import { ApiGatewayService } from '../services/api-gateway.service';

@Injectable({
  providedIn: 'root'
})
export class BacklogBusinessService {

  constructor(private apiGatewayService: ApiGatewayService)  { }


  public GetBacklog(): Promise<Requirement[]> {
    let serviceObj = new ServiceObject("BacklogService", 'Backlog', 'list-backlog');
    let req = new Requirement()
    req.Title = "Un Requisito sin alma porque es falso"
    req.RequirementId = "Requerimiento Fantasma"
    req.EspecificationLink = "Imagen de especificacion"
    return Promise.resolve([req] as Requirement[])
   /*  return this.apiGatewayService.PostAction(serviceObj)
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
      }); */
  }


}
