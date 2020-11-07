import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectsComponent } from './projects.component';
import { TasksModule } from '../tasks/tasks.module';



@NgModule({
  declarations: [ProjectsComponent],
  imports: [
    CommonModule,
    TasksModule
  ]
})
export class ProjectsModule { }
