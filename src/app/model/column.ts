import { AgileStates } from './agile-states.enum';
import { PlanningEntryPlanner } from './planning-entry-planner';

export class Column {
  constructor(public name: string, public agileState: AgileStates, public tasks: PlanningEntryPlanner[]) {}
}
