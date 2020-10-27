import { Component, OnInit } from '@angular/core';
import { UserProfileBusinessService } from 'src/app/business/auth/user-profile-business.service';
import { User } from 'src/app/model/user';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers:[UserProfileBusinessService]
})
export class UserProfileComponent implements OnInit {

  myUser: User = new User();

  constructor(private userBusiness: UserProfileBusinessService) {
    this.getProjects();
  }

  getProjects() {
    this.userBusiness.getUser(1).subscribe(data =>{
      console.log("Datos " + data );
      this.myUser = data;
      console.log(this.myUser);
    }, error =>{
      console.log(error);
    })
  }

  ngOnInit(){

  }
}
