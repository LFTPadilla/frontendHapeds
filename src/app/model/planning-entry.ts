import { AgileStates } from './agile-states.enum';
import { PlanningPeriod } from './planning-period';

export class PlanningEntry {

  Id: number;
  Creation: string;
  Edition: string;
  PlannedHours: number;
  RealHours: number;
  PlannedEffort: number;
  RealEffort: number;
  State: AgileStates;
  Annotation: string;
  Period: PlanningPeriod;
}
