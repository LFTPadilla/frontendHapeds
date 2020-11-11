import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequirementsComponent } from './requirements.component';
import { RequirementEditComponent } from '../requirement-edit/requirement-edit.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [RequirementsComponent, RequirementEditComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class RequirementsModule { }
