import { Component, OnInit } from '@angular/core';
import { UserBusinessService } from 'src/app/business/master/user-business.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[] = [];

  constructor(private userBusiness: UserBusinessService) {
    this.getUsers();
  }

  getUsers() {
    //Nuevo
    this.userBusiness.GetUsers().then(x => {
      this.users = x
      //console.log("Se cargaron correctamente los usuarios"+x);
    }).catch(x => {
      //console.log("error"+x);
    });
  }

  ngOnInit(){

  }

}
