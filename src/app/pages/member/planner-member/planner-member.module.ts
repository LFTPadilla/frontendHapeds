import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlannerMemberComponent } from './planner-member.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [PlannerMemberComponent],
  imports: [
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DragDropModule
  ]
})
export class PlannerMemberModule { }
