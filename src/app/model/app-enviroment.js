"use strict";
exports.__esModule = true;
exports.AppEnviroment = void 0;
var user_1 = require("./user");
var http_1 = require("@angular/common/http");
var AppEnviroment = /** @class */ (function () {
    function AppEnviroment() {
    }
    Object.defineProperty(AppEnviroment, "User", {
        get: function () {
            if (localStorage.getItem("u"))
                return JSON.parse(atob(localStorage.getItem("u")));
            else
                return new user_1.User();
        },
        set: function (user) {
            localStorage.setItem("u", btoa(JSON.stringify(user)));
        },
        enumerable: false,
        configurable: true
    });
    AppEnviroment.IsConnected = function () {
        return true;
    };
    AppEnviroment.LoadConfiguration = function () {
        AppEnviroment.Home = '/dashboard/analytics';
        var httpClient = new http_1.HttpClient(new http_1.HttpXhrBackend({ build: function () { return new XMLHttpRequest(); } }));
        var jsonFile = "assets/config.json";
        return new Promise(function (resolve, reject) {
            httpClient.get(jsonFile).toPromise().then(function (response) {
                //console.log("Resolvio bien" + response);
                var result = response;
                AppEnviroment.ApiEndPoint = result.ApiEndPoint;
                resolve();
            })["catch"](function (response) {
                reject("No puede cargar el archivo de configuraci\u00F3n: ' " + JSON.stringify(response));
            });
        });
    };
    AppEnviroment.CloseSession = function () {
        localStorage.clear();
    };
    return AppEnviroment;
}());
exports.AppEnviroment = AppEnviroment;
