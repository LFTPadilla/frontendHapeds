import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlannerScrumComponent } from './planner-scrum.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [PlannerScrumComponent],
  imports: [
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule
  ]
})
export class PlannerScrumModule { }
