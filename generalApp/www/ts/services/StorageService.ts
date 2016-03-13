/// <reference path="../app.ts"/>


class LocalStorage {

  constructor() {}

  public set = function (key, value) {
    window.localStorage[key] = value;
  }

  public get = function (key, defaultValue) {
    return window.localStorage[key] || defaultValue;
  }

  public setObject = function (key, value) {
    window.localStorage[key] = JSON.stringify(value);
  }

  public getObject = function (key) {
    return JSON.parse(window.localStorage[key] || '{}');
  }

}

angular.module('StorageService', []).service('$localStorage', LocalStorage);
