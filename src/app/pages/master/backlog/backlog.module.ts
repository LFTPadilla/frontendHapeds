import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BacklogComponent } from './backlog.component';
import { FormsModule } from '@angular/forms';
import { RequirementEditComponent } from '../requirement-edit/requirement-edit.component';



@NgModule({
  declarations: [BacklogComponent, RequirementEditComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class BacklogModule { }
