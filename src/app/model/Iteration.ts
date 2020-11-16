import { IterationTask } from './iteration-task';
import { Project } from './project';

export class Iteration {

    IterationCode: string;
    ProjectId: string;
    Title: string;
    StartDate: Date;
    PlannedEndDate: Date;
    RealEndDate: Date;
    PlannedEffort: number;
    RealEffort: number;
    Progress: number;
    Tasks: IterationTask[] = [];
}
