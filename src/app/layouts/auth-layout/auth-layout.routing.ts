import { Routes } from '@angular/router';
import { RegisterComponent } from 'src/app/pages/authentication/register/register.component';

import { LoginComponent } from '../../pages/authentication/login/login.component';


export const AuthLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'register',       component: RegisterComponent }
];
