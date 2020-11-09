import { Injectable } from '@angular/core';
import { Requirement } from 'src/app/model/Requirement';
import { ServiceObject } from 'src/app/model/service-object';
import { ApiGatewayService } from '../services/api-gateway.service';

@Injectable({
  providedIn: 'root'
})
export class RequirementsBusinessService {

  constructor(private apiGatewayService: ApiGatewayService)  { }


  public GetRequirements(projectId: string): Promise<Requirement[]> {
    let serviceObj = new ServiceObject("Hapeds", 'Requiremente', 'GetRequirements');
    serviceObj.Data = { projectId }
    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        const projects = x as Requirement[];
        return projects;
      })
      .catch(x => {
        throw x
      });
    }

    public SaveRequirement(requiremet: Requirement): Promise<number> {

      let serviceObject = new ServiceObject('TagsLogic', 'MaterialsRequest', 'SaveRequirement');
      serviceObject.Data = { requiremet };

      return this.apiGatewayService.PostAction(serviceObject)
        .then(x => {
          serviceObject = x as ServiceObject;
          if (!serviceObject.Success) {
            throw new Error(serviceObject.Message);
          } else {
            return serviceObject.Data as number;
          }
        })
        .catch(x => {
          throw x.message;
        });
    }



}
