import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppEnviroment } from 'src/app/model/app-enviroment';
import { ServiceObject } from 'src/app/model/service-object';
import { User } from 'src/app/model/user';
import { ApiGatewayService } from '../services/api-gateway.service';

@Injectable({
  providedIn: 'root'
})
export class UserBusinessService {


  baseurl = '';
  //httpHeaders = new HttpHeaders({'Content-Type':'application/json','Access-Control-Allow-Origin':'*'});//
  httpHeaders = new HttpHeaders({'Content-Type':'application/json'});


  constructor(private httpClient: HttpClient,private apiGatewayService: ApiGatewayService) {

  }


  public async GetUser(): Promise<User[]> {
    let serviceObj = new ServiceObject("UserService", 'AdminUser', 'GetUser');

    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = x as ServiceObject;
        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }
        const Users = serviceObj.Data as User[];
        return Users;
      })
      .catch(x => {
        throw x
      });
  }

  GetUsers(): Promise<User[]> {
    let serviceObj = new ServiceObject("UserService", 'AdminUser', 'list-members');

    return this.apiGatewayService.PostAction(serviceObj)
      .then(x => {
        serviceObj = x as ServiceObject;
        if (!serviceObj.Success) {
          throw new Error(serviceObj.Message);
        }

        return serviceObj.Data as User[];
      })
      .catch(x => {
        throw x
      });
  }

  public SavePrinter(printer: User): Promise<boolean> {
    let serviceObject = new ServiceObject('PrintingService', 'AdminUser', 'SaveUser');
    serviceObject.Data = { printer };

    return this.apiGatewayService.PostAction(serviceObject)
      .then(x => {
        serviceObject = x as ServiceObject;
        if (!serviceObject.Success) {
          throw new Error(serviceObject.Message);
        } else {
          return serviceObject.Data as boolean;
        }
      })
      .catch(x => {
        throw x
      });
  }

  public DeleteUser(UserId: number): Promise<boolean> {
    let serviceObject = new ServiceObject('PrintingService', 'AdminUser', 'DeleteUser');
    serviceObject.Data = { UserId };

    return this.apiGatewayService.PostAction(serviceObject)
      .then(x => {
        serviceObject = x as ServiceObject;
        if (!serviceObject.Success) {
          throw new Error(serviceObject.Message);
        } else {
          return serviceObject.Data as boolean;
        }
      })
      .catch(x => {
        throw x
      });
  }
}
