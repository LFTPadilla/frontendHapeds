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
    this.userBusiness.getUsers().subscribe(data =>{
      console.log("Datos " + data );
     this.users = data;
    }, error =>{
      console.log(error);
    })
  }

  ngOnInit(){

  }

}
