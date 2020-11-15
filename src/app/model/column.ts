import { PlanningEntryPlanner } from './planning-entry-planner';

export class Column {
  constructor(public name: string, public tasks: PlanningEntryPlanner[]) {}
}
