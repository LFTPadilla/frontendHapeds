export class PlanningPeriod {


  AvailableHours: number;
  PlannedEffort: number;
  PlannedHours: number;
  RealHours: number;
  RealEffort: number;

  constructor(public PeriodId: number,
    public PeriodTitle: string,
    public StartDate: Date,
    public EndDate: Date){}

}
