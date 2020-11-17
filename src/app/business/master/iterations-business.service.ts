import { Injectable } from '@angular/core';
import { Iteration } from 'src/app/model/Iteration';
import { ServiceObject } from 'src/app/model/service-object';
import { ApiGatewayService } from '../services/api-gateway.service';

@Injectable({
  providedIn: 'root'
})
export class IterationsBusinessService {

  constructor(private apiGatewayService: ApiGatewayService) { }


  public GetIterations(projectId: string): Promise<Iteration[]> {
    let serviceObj = new ServiceObject("Hapeds", 'Iterations', 'GetIterations');
    serviceObj.Data = { projectId }
    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        const iterations = x as Iteration[];
        return iterations;
      })
      .catch(x => {
        throw x
      });
  }

  public SaveIteration(iteration: Iteration): Promise<number> {

    let serviceObject = new ServiceObject('Hapeds', 'Iterations', 'SaveIteration');
    serviceObject.Data = { iteration };

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
