import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppEnviroment } from 'src/app/model/app-enviroment';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    permission: string;
}
export const ROUTES: RouteInfo[] = [
    /*{ path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
    { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
    */
    { path: '/planner-scrum', title: 'Planner-Scrum',  icon:'ni-planet text-green', class: '',permission:'planner-scrum' },
    { path: '/planner-member', title: 'Planner-Member',  icon:'ni-planet text-blue', class: '',permission:'planner-member' },
    { path: '/list-members', title: 'Usuarios',  icon:'ni-single-02 text-yellow', class: '',permission:'planner-scrum' },
    { path: '/projects', title: 'Proyectos',  icon:'ni ni-folder-17 text-blue', class: '',permission:'*' },
    { path: '/requirements', title: 'Requerimientos',  icon:'ni-bullet-list-67 text-red', class: '',permission:'planner-scrum' },
    { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '',permission:'*' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem =>{
      if(menuItem.permission == '*'  || AppEnviroment.User.Member.Permissions.includes(menuItem.permission)){
        return menuItem;
      }
    });
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
}
