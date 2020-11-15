import { AgileStates } from './agile-states.enum';
import { IterationTaskTypes } from './iteration-task-types.enum';

export class IterationTask {



  TaskType: IterationTaskTypes;
  PlannedEffort: number;
  RealEffort: number;
  PlannedHours: number;
  State: AgileStates;
  Creation: string;
  Edition: string;

  constructor(public Code: string,public Title: string){}

}
