export class Requirement {

    RequirementId: string;
    ProjectId: string;
    Title: string;
    Description: string;
    EspecificationLink: string;
    Creation:string;
    Edition:string;
    PlannedEffort: number;
    RealEffort: number;
    // State=
    // IterationTaskCode = models.OneToOneField('IterationTask', on_delete=models.DO_NOTHING)
    // IterationCode = models.ForeignKey('Iteration', on_delete=models.DO_NOTHING)
}