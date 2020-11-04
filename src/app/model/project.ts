export class Project {

    ProjectId:string;
    Title: string;
    Description: string;
    StartDate: Date;
    EndDate: Date;
    Active: boolean;
}
//ESTOS DE ABAJO SON NECESARIOS?????????????????????????????????????
export class FileObject {
    FileName: string;
    FileType: string;
    FileData: any;
}

export class Profile {
    ProfileId: string;
    ProfileName: string;
    Permissions: string[] =[];
}
