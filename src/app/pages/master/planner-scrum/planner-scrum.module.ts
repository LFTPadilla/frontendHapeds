import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlannerScrumComponent } from './planner-scrum.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IterationEditModule } from '../iteration-edit/iteration-edit.module';
import { IterationEditComponent } from '../iteration-edit/iteration-edit.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ProjectEditComponent } from '../project-edit/project-edit.component';
import { TaskEditComponent } from '../task-edit/task-edit.component';



@NgModule({
  declarations: [PlannerScrumComponent, IterationEditComponent, ProjectEditComponent, TaskEditComponent],
  imports: [
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DragDropModule

  ]
})
export class PlannerScrumModule { }
