import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AppEnviroment } from 'src/app/model/app-enviroment';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})
export class AdminLayoutComponent implements OnInit {

  constructor(private router: Router) {
    if(AppEnviroment.User.UserId==0){
      this.router.navigate(["login"]);
    }
  }

  ngOnInit() {
  }

}
