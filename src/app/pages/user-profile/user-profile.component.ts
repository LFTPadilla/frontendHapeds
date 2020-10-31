import { Component, OnInit } from '@angular/core';
import { UserProfileBusinessService } from 'src/app/business/auth/user-profile-business.service';
import { User } from 'src/app/model/user';
import { UserOriginal } from 'src/app/model/userOriginal';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  providers:[UserProfileBusinessService]
})
export class UserProfileComponent implements OnInit {

  myUser: UserOriginal = new UserOriginal();

  constructor(private userBusiness: UserProfileBusinessService) {
    this.getUser();
  }

  getUser() {
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
