import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';


@Injectable({
  providedIn: 'root'
})
export class UserProfileBusinessService {

  baseurl = '';
  httpHeaders = new HttpHeaders({'Content-Type':'application/json','Access-Control-Allow-Origin':'*'});

  constructor(private httpClient: HttpClient) {

  }

  getUser(id:number): Observable<any> {
    return this.httpClient.get( this.baseurl+ '/users/'+id+'/?format=json',
    {headers: this.httpHeaders}) ;
  }


}
