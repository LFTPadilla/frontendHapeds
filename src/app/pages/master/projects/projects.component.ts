import { Component, OnInit } from '@angular/core';
import { ProjectBusinessService } from 'src/app/business/master/project-business.service';
import { UserBusinessService } from 'src/app/business/master/user-business.service';
import { Project } from 'src/app/model/project';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit {

  projects: Project[] = [];

  constructor(private projectBusiness: ProjectBusinessService) {
    this.getProjects();
  }

  getProjects(){
    this.projectBusiness.GetProjects().then(x => {
      this.projects = x
      console.log("Se cargaron correctamente los proyectos"+x);
    }).catch(x => {
      console.log("error"+x);
    });

  }

  ngOnInit(): void {
  }

}
