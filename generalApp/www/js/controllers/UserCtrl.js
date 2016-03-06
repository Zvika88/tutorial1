angular.module('udemy').controller('UserCtrl', function($scope, $state, $ionicPopup, AuthService) {

  $scope.doLogin = function(loginData) {
    AuthService.login(loginData.username, loginData.password).then(function(authenticated) {
      loginData.username = '';
      loginData.password = '';
      $state.go('app.main', {}, {
        reload: true
      });
    }, function(err) {
      var alertPopup = $ionicPopup.alert({
        title: 'Login failed!',
        template: 'Please check your credentials!'
      });
    });
  }

  $scope.doLogout = function() {
    AuthService.logout();
    $state.go('login');
  }

});
