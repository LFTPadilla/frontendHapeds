import { AgileStates } from './agile-states.enum';
import { IterationTaskTypes } from './iteration-task-types.enum';
import { PlanningEntry } from './planning-entry';
import { PlanningEntryPlanner } from './planning-entry-planner';

export class IterationTask {



  TaskType: IterationTaskTypes;
  PlannedEffort: number;
  RealEffort: number;
  PlannedHours: number;
  State: AgileStates;
  Creation: string;
  Edition: string;
  Planning: PlanningEntry[];

  constructor(public Code: string,public Title: string) {}

}
