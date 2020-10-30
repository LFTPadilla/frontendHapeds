"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
exports.__esModule = true;
exports.renderModuleFactory = exports.renderModule = exports.AppServerModule = void 0;
/***************************************************************************************************
 * Load `$localize` onto the global scope - used if i18n tags appear in Angular templates.
*/
require("@angular/localize/init");
var core_1 = require("@angular/core");
var environment_1 = require("./environments/environment");
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
var app_server_module_1 = require("./app/app.server.module");
__createBinding(exports, app_server_module_1, "AppServerModule");
var platform_server_1 = require("@angular/platform-server");
__createBinding(exports, platform_server_1, "renderModule");
__createBinding(exports, platform_server_1, "renderModuleFactory");
