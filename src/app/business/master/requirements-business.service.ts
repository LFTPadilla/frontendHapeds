import { Injectable } from '@angular/core';
import { Requirement } from 'src/app/model/Requirement';
import { ServiceObject } from 'src/app/model/service-object';
import { ApiGatewayService } from '../services/api-gateway.service';

@Injectable({
  providedIn: 'root'
})
export class RequirementsBusinessService {

  constructor(private apiGatewayService: ApiGatewayService) { }


  public GetRequirements(): Promise<Requirement[]> {
    let serviceObj = new ServiceObject("Hapeds", 'Requirements', 'GetRequirements');
    //serviceObj.Data = { projectId }
    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        const requirements = x as Requirement[];
        return requirements;
      })
      .catch(x => {
        throw x
      });
  }

  public SaveRequirement(requirement: Requirement): Promise<number> {

    let serviceObject = new ServiceObject('Hapeds', 'Requirements', 'SaveRequirement');
    serviceObject.Data = { requirement };

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
