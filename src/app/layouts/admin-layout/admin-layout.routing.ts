import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { UsersComponent } from 'src/app/pages/master/users/users.component';
import { ProjectsModule } from 'src/app/pages/master/projects/projects.module';
import { ProjectsComponent } from 'src/app/pages/master/projects/projects.component';
import { TasksComponent } from 'src/app/pages/master/tasks/tasks.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'list-members',     component: UsersComponent },
    { path: 'projects',       component: ProjectsComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'tasks',          component:TasksComponent}
];
