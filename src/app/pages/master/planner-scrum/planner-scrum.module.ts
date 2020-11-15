import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlannerScrumComponent } from './planner-scrum.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IterationEditModule } from '../iteration-edit/iteration-edit.module';
import { IterationEditComponent } from '../iteration-edit/iteration-edit.component';
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [PlannerScrumComponent, IterationEditComponent],
  imports: [
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DragDropModule

  ]
})
export class PlannerScrumModule { }
