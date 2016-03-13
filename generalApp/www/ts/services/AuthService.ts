/// <reference path="../app.ts"/>

class AuthService {

  private LOCAL_TOKEN_KEY:  string = 'authKey';
  public username:          string = '';
  public isAuthenticated:   boolean = false;
  public role:              string = '';
  public authToken:         string;

  constructor(public $q:any,
              public $http:any,
              public USER_ROLES:string[]) {
    this.loadUserCredentials();
  }

  public loadUserCredentials = function () {
    var token = window.localStorage.getItem(this.LOCAL_TOKEN_KEY);
    if (token) {
      this.useCredentials(token);
    }
  }

  public storeUserCredentials = function (token) {
    window.localStorage.setItem(this.LOCAL_TOKEN_KEY, token);
    this.useCredentials(token);
  }

  public useCredentials = function (token) {
    this.username = token.split('.')[0];
    this.isAuthenticated = true;
    this.authToken = token;

    if (this.username == 'admin') {
      this.role = this.USER_ROLES.admin
    }
    if (this.username == 'user') {
      this.role = this.USER_ROLES.public
    }

    // Set the token as header for your requests!
    this.$http.defaults.headers.common['X-Auth-Token'] = token;
  }

  public destroyUserCredentials = function () {
    this.authToken = undefined;
    this.username = '';
    this.isAuthenticated = false;
    this.$http.defaults.headers.common['X-Auth-Token'] = undefined;
    window.localStorage.removeItem(this.LOCAL_TOKEN_KEY);
  }

  public login = function (name, pw) {
    var self = this;
    return this.$q(function (resolve, reject) {
      if ((name == 'admin' && pw == '1') || (name == 'user' && pw == '1')) {
        // Make a request and receive your auth token from your server
        self.storeUserCredentials(name + '.yourServerToken');
        resolve('Login success.');
      } else {
        reject('Login Failed.');
      }
    });
  }

  public logout = function () {
    this.destroyUserCredentials();
  }

  public isAuthorized = function (authorizedRoles, role) {
    if (!angular.isArray(authorizedRoles)) {
      authorizedRoles = [authorizedRoles];
    }
    return (this.isAuthenticated && authorizedRoles.indexOf(role) !== -1);
  }

}


angular.module('ioneazly')
  .service('AuthService', AuthService)
  .factory('AuthInterceptor', function ($rootScope, $q, AUTH_EVENTS) {
    return {
      responseError: function (response) {
        $rootScope.$broadcast({
          401: AUTH_EVENTS.notAuthenticated,
          403: AUTH_EVENTS.notAuthorized
        }[response.status], response);
        return $q.reject(response);
      }
    };
  })
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
  })
