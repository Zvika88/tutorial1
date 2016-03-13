/// <reference path="../app.ts"/>
var LocalStorage = (function () {
    function LocalStorage() {
        this.set = function (key, value) {
            window.localStorage[key] = value;
        };
        this.get = function (key, defaultValue) {
            return window.localStorage[key] || defaultValue;
        };
        this.setObject = function (key, value) {
            window.localStorage[key] = JSON.stringify(value);
        };
        this.getObject = function (key) {
            return JSON.parse(window.localStorage[key] || '{}');
        };
    }
    return LocalStorage;
}());
angular.module('StorageService', []).service('$localStorage', LocalStorage);
