import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RequirementsComponent } from './requirements.component';
import { RequirementEditComponent } from '../requirement-edit/requirement-edit.component';
import { FormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';



@NgModule({
  declarations: [RequirementsComponent, RequirementEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgSelectModule //Se pone en el padre (Layout-admin) para que sea general a todos
  ]
})
export class RequirementsModule { }
