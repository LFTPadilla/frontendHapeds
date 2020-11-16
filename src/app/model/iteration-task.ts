import { AgileStates } from './agile-states.enum';
import { IterationTaskTypes } from './iteration-task-types.enum';
import { PlanningEntry } from './planning-entry';
import { PlanningEntryPlanner } from './planning-entry-planner';

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
  Planning: PlanningEntry[];

  constructor(public Code: string,public Title: string) {}

}
