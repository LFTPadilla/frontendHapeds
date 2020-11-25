import { AgileStates } from './agile-states.enum';
import { IterationTaskTypes } from './iteration-task-types.enum';

export class PlanningEntryPlanner {


  constructor(public Code: string,public PlanningEntryId:number, public Title: string
    , public TaskType: IterationTaskTypes
    , public PlannedEffort: number
    , public State: AgileStates){  }

}
