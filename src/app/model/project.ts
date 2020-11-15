export class Project {

    
    Description: string;
    StartDate: Date;
    EndDate: Date;
    Active: boolean;
    
    constructor(public ProjectId:string, public Title: string){

    }
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
