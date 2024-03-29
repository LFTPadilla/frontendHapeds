import { Injectable } from '@angular/core';
import { ApiGatewayService } from '../services/api-gateway.service';
import { ServiceObject } from 'src/app/model/service-object';
import { AppEnviroment } from 'src/app/model/app-enviroment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationBusinessService {

  constructor(private apigateway:ApiGatewayService,private router: Router) { }

  public async CreateSession(login : string, password : string)
  {
    return this.apigateway.CreateSession(login, password)
      .then(x => {
        let serviceResponse = <ServiceObject>x;
        if (!serviceResponse.Success)
          throw new Error(serviceResponse.Message);
        //Guarda Usuario en Session
        //serviceResponse.Data.SessionToken = serviceResponse.SessionToken;


       if(x.Success){
        AppEnviroment.User = x.User;
       }

        //Mapea objeto
        return Promise.resolve(x);
      })
      .catch(x => {
        throw x;
      });
  }

  public async RegisterUser(form:any)
  {
    return this.apigateway.RegisterUser(form.login,form.document,form.email,form.password).then(x => {
        let serviceResponse = <ServiceObject>x;
        if (!serviceResponse.Success)
          throw serviceResponse.Message;
        //Guarda Usuario en Session
        //serviceResponse.Data.SessionToken = serviceResponse.SessionToken;
        //AppEnviroment.User = x.User;

        //Mapea objeto
        return Promise.resolve(x);
      })
      .catch(x => {
        console.log("mando la excepcion",x);
        throw x;
      });
  }

  public CloseSession()
  {
    AppEnviroment.CloseSession();
  }

  public ValidateSession() : boolean
  {
    if(AppEnviroment.User == null)
      {
        this.CloseSession();
        return false;
      }
      return true;
  }

  public async RememberPassword(mail:string): Promise<string>
  {
    return this.apigateway.RememberPassword(mail)
      .then(x => {
        let serviceResponse = <ServiceObject>x;
        if (!serviceResponse.Success)
          throw new Error(serviceResponse.Message);

        //Mapea objeto
        return Promise.resolve(serviceResponse.Message);
      })
      .catch(x => {
        throw x;
      });
  }


  public GetUser()
  {
    this.ValidateSession();
    return AppEnviroment.User;
  }

  public GetApiEndPoint()
  {
    return AppEnviroment.ApiEndPoint;
  }

}
