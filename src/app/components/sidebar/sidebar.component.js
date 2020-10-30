"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SidebarComponent = exports.ROUTES = void 0;
var core_1 = require("@angular/core");
exports.ROUTES = [
    { path: '/dashboard', title: 'Dashboard', icon: 'ni-tv-2 text-primary', "class": '' },
    { path: '/icons', title: 'Icons', icon: 'ni-planet text-blue', "class": '' },
    { path: '/maps', title: 'Maps', icon: 'ni-pin-3 text-orange', "class": '' },
    { path: '/user-profile', title: 'User profile', icon: 'ni-single-02 text-yellow', "class": '' },
    { path: '/list-users', title: 'Usurios', icon: 'ni-bullet-list-67 text-red', "class": '' },
    { path: '/login', title: 'Login', icon: 'ni-key-25 text-info', "class": '' },
    { path: '/register', title: 'Register', icon: 'ni-circle-08 text-pink', "class": '' }
];
var SidebarComponent = /** @class */ (function () {
    function SidebarComponent(router) {
        this.router = router;
        this.isCollapsed = true;
    }
    SidebarComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.menuItems = exports.ROUTES.filter(function (menuItem) { return menuItem; });
        this.router.events.subscribe(function (event) {
            _this.isCollapsed = true;
        });
    };
    SidebarComponent = __decorate([
        core_1.Component({
            selector: 'app-sidebar',
            templateUrl: './sidebar.component.html',
            styleUrls: ['./sidebar.component.scss']
        })
    ], SidebarComponent);
    return SidebarComponent;
}());
exports.SidebarComponent = SidebarComponent;
