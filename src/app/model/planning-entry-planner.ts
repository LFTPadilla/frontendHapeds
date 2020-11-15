import { AgileStates } from './agile-states.enum';
import { TaskTypes } from './task-types.enum';

export class PlanningEntryPlanner {


  constructor( public TitleTask: string
    , public TaskType: TaskTypes
    , public PlannedEffort: number
    , public State: AgileStates){  }

}
