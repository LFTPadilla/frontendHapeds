import { AgileStates } from './agile-states.enum';
import { IterationTaskTypes } from './iteration-task-types.enum';

export class IterationTask {



  TaskType: IterationTaskTypes;
  IterationCode: string;
  ProjectId: string;
  RequirementId: string;
  PlannedEffort: number;
  RealEffort: number;
  PlannedHours: number;
  RealHours: number;
  State: AgileStates;
  Creation: string;
  Edition: string;

  constructor(public Code: string,public Title: string){}

}
