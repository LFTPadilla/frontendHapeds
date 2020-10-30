"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
exports.app = void 0;
require("zone.js/dist/zone-node");
var express_engine_1 = require("@nguniversal/express-engine");
var express = require("express");
var path_1 = require("path");
var main_server_1 = require("./src/main.server");
var common_1 = require("@angular/common");
var fs_1 = require("fs");
// The Express app is exported so that it can be used by serverless Functions.
function app() {
    var server = express();
    var distFolder = path_1.join(process.cwd(), 'dist/front-hapeds/browser');
    var indexHtml = fs_1.existsSync(path_1.join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';
    // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
    server.engine('html', express_engine_1.ngExpressEngine({
        bootstrap: main_server_1.AppServerModule
    }));
    server.set('view engine', 'html');
    server.set('views', distFolder);
    // Example Express Rest API endpoints
    // server.get('/api/**', (req, res) => { });
    // Serve static files from /browser
    server.get('*.*', express.static(distFolder, {
        maxAge: '1y'
    }));
    // All regular routes use the Universal engine
    server.get('*', function (req, res) {
        res.render(indexHtml, { req: req, providers: [{ provide: common_1.APP_BASE_HREF, useValue: req.baseUrl }] });
    });
    return server;
}
exports.app = app;
function run() {
    var port = process.env.PORT || 4000;
    // Start up the Node server
    var server = app();
    server.listen(port, function () {
        console.log("Node Express server listening on http://localhost:" + port);
    });
}
var mainModule = __non_webpack_require__.main;
var moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
    run();
}
__exportStar(require("./src/main.server"), exports);
