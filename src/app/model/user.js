"use strict";
exports.__esModule = true;
exports.Profile = exports.FileObject = exports.User = void 0;
var User = /** @class */ (function () {
    function User() {
        this.UserId = 0;
        this.Profile = new Profile();
    }
    return User;
}());
exports.User = User;
var FileObject = /** @class */ (function () {
    function FileObject() {
    }
    return FileObject;
}());
exports.FileObject = FileObject;
var Profile = /** @class */ (function () {
    function Profile() {
        this.Permissions = [];
    }
    return Profile;
}());
exports.Profile = Profile;
