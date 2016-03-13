/// <reference path="../app.ts"/>
var AuthService = (function () {
    AuthService.$inject = ['$q', '$http', 'USER_ROLES'];
    function AuthService($q, $http, USER_ROLES) {
        this.$q = $q;
        this.$http = $http;
        this.USER_ROLES = USER_ROLES;
        this.LOCAL_TOKEN_KEY = 'authKey';
        this.username = '';
        this.isAuthenticated = false;
        this.role = '';
        this.loadUserCredentials = function () {
            var token = window.localStorage.getItem(this.LOCAL_TOKEN_KEY);
            if (token) {
                this.useCredentials(token);
            }
        };
        this.storeUserCredentials = function (token) {
            window.localStorage.setItem(this.LOCAL_TOKEN_KEY, token);
            this.useCredentials(token);
        };
        this.useCredentials = function (token) {
            this.username = token.split('.')[0];
            this.isAuthenticated = true;
            this.authToken = token;
            if (this.username == 'admin') {
                this.role = this.USER_ROLES.admin;
            }
            if (this.username == 'user') {
                this.role = this.USER_ROLES.public;
            }
            // Set the token as header for your requests!
            this.$http.defaults.headers.common['X-Auth-Token'] = token;
        };
        this.destroyUserCredentials = function () {
            this.authToken = undefined;
            this.username = '';
            this.isAuthenticated = false;
            this.$http.defaults.headers.common['X-Auth-Token'] = undefined;
            window.localStorage.removeItem(this.LOCAL_TOKEN_KEY);
        };
        this.login = function (name, pw) {
            var self = this;
            return this.$q(function (resolve, reject) {
                if ((name == 'admin' && pw == '1') || (name == 'user' && pw == '1')) {
                    // Make a request and receive your auth token from your server
                    self.storeUserCredentials(name + '.yourServerToken');
                    resolve('Login success.');
                }
                else {
                    reject('Login Failed.');
                }
            });
        };
        this.logout = function () {
            this.destroyUserCredentials();
        };
        this.isAuthorized = function (authorizedRoles, role) {
            if (!angular.isArray(authorizedRoles)) {
                authorizedRoles = [authorizedRoles];
            }
            return (this.isAuthenticated && authorizedRoles.indexOf(role) !== -1);
        };
        this.loadUserCredentials();
    }
    return AuthService;
}());
angular.module('ioneazly').service('AuthService', AuthService)
    .factory('AuthInterceptor', ['$rootScope', '$q', 'AUTH_EVENTS', function ($rootScope, $q, AUTH_EVENTS) {
    return {
        responseError: function (response) {
            $rootScope.$broadcast({
                401: AUTH_EVENTS.notAuthenticated,
                403: AUTH_EVENTS.notAuthorized
            }[response.status], response);
            return $q.reject(response);
        }
    };
}])
    .config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
}]);
