import { AgileStates } from './agile-states.enum';
import { PlanningPeriod } from './planning-period';

export class PlanningEntry {

  constructor(public State: AgileStates,
     public ProjectId: string, public IterationTaskCode: string, public IterationCode: string){}

  Id: number;
  Creation: string;
  Edition: string;
  PlannedHours: number;
  RealHours: number;
  PlannedEffort: number;
  RealEffort: number;
  Annotation: string;
  Document: string;
  StartDate: Date;
  EndDate: Date;
}
