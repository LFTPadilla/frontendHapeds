import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IterationEditComponent } from './iteration-edit.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [IterationEditComponent],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class IterationEditModule { }
