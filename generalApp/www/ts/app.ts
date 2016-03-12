/// <reference path="../../typings/main.d.ts"/>

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js

angular.module('ioneazly', ['ionic', 'ngCordova', 'StorageService'])

.constant('AUTH_EVENTS', {
  notAuthenticated: 'auth-not-authenticated',
  notAuthorized: 'auth-not-authorized'
})

.constant('USER_ROLES', {
  admin: 'admin_role',
  public: 'public_role'
})

.run(function($ionicPlatform, $rootScope, $state, AuthService, AUTH_EVENTS) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
  });

  $rootScope.$on('$stateChangeStart', function(event, next, nextParams, fromState) {

    if ('data' in next && 'authorizedRoles' in next.data) {
      var authorizedRoles = next.data.authorizedRoles;
      if (!AuthService.isAuthorized(authorizedRoles)) {
        event.preventDefault();
        $state.go($state.current, {}, {
          reload: true
        });
        $rootScope.$broadcast(AUTH_EVENTS.notAuthorized);
      }
    }

    if (!AuthService.isAuthenticated()) {
      if (next.name !== 'login') {
        event.preventDefault();
        $state.go('login');
      }
    }
  });

})

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // Setup abstract layer for the side menu
    .state('app', {
    url: '',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'UserCtrl'
  })

  // View where users can login
  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'UserCtrl'
  })

  // Main welcome screen
  .state('app.main', {
    url: '/main',
    views: {
      'menuContent': {
        templateUrl: 'templates/main.html'
      }
    }
  })

  // Todo list view
  .state('app.todo', {
    url: '/todo',
    views: {
      'menuContent': {
        templateUrl: 'templates/todo-list.html',
        controller: 'TodoListCtrl'
      }
    }
  })

  // Todo single item view
  .state('app.todo.single', {
    url: '/:todoId',
    views: {
      'menuContent@app': {
        templateUrl: 'templates/todo-single.html',
        controller: 'TodoSingleCtrl'
      }
    }
  })

  // Barcode scanner view
  .state('app.barcodescanner', {
    url: '/barcodescanner',
    views: {
      'menuContent': {
        templateUrl: 'templates/barcodeScanner.html',
        controller: 'BarcodeScannerCtrl'
      }
    }
  });

  // If none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/main');

});