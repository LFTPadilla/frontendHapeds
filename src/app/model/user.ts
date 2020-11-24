export class User {

    UserId: number=0;
    Names: string;
    Document: string;
    Mail: string;
    Login: string;
    Phone: string;
    Active: boolean;
    Address: string;
    //Profile: Profile = new Profile();
    Member: TeamMember = new TeamMember();
    Picture: FileObject;
    Password: string;
    UserStamp:string;
    SessionToken:string;
    Edition : string;
}

export class TeamMember{
  Names: string;
  Document: string;
  Mail: string;
  AvaliableWeekHours: number;
  Active: boolean;
  Permissions: string[] =[];
}

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
