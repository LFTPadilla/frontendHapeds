import { Component, OnInit } from '@angular/core';
import { UserBusinessService } from 'src/app/business/master/user-business.service';
import { Project } from 'src/app/model/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = [];

  constructor(private userBusiness: UserBusinessService) { 
    this.getProjects();
  }

  getProjects(){
    this.userBusiness.getProjects().subscribe(data =>{
      console.log("Projectos " + data );
     this.projects = data;
    }, error =>{
      console.log(error);
    })
  }

  ngOnInit(): void {
  }

}
