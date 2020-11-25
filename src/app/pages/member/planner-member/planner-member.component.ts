import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { AgileStates } from 'src/app/model/agile-states.enum';
import { Board } from 'src/app/model/board';
import { Column } from 'src/app/model/column';
import { IterationTaskTypes } from 'src/app/model/iteration-task-types.enum';
import { PlanningEntryPlanner } from 'src/app/model/planning-entry-planner';

@Component({
  selector: 'app-planner-member',
  templateUrl: './planner-member.component.html',
  styleUrls: ['./planner-member.component.scss']
})
export class PlannerMemberComponent implements OnInit {

  boardSelected: Board = new Board("Semana ",null,null, [
      new Column('PLANEADO', AgileStates.Planned, []),
      new Column('EN PROGRESO', AgileStates.InProgress, []),
      new Column('EN REVISIÓN', AgileStates.InReview, []),
      new Column('FINALIZADO', AgileStates.Done, [])
    ]);
  WeekPosition: number = 0;
  IterationBoards: Board[] = [];

  constructor() { }

  drop(event: CdkDragDrop<string[]>, columnName: string) {
    //console.log("antes",columnName,event.item.data);
    //En caso de que se mueva en el mismo contenedor
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      //En caso de que cambie contenedor
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    //console.log("despues",event);
  }


  ChangeWeek(action: number){
    this.WeekPosition+=action;
    this.boardSelected = this.IterationBoards[this.WeekPosition];
  }


  ngOnInit(): void {
  }

}
