import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UsersModule } from 'src/app/pages/master/users/users.module';
import { ProjectsModule } from 'src/app/pages/master/projects/projects.module';
import { TasksModule } from 'src/app/pages/master/tasks/tasks.module';
import { RequirementsModule } from 'src/app/pages/master/requirements/requirements.module';

import { PlannerScrumModule } from 'src/app/pages/master/planner-scrum/planner-scrum.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    UsersModule,
    ProjectsModule,
    TasksModule,
    RequirementsModule,
    PlannerScrumModule
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    IconsComponent,
    MapsComponent
  ]
})

export class AdminLayoutModule {}
