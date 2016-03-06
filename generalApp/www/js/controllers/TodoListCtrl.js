angular.module('udemy').controller('TodoListCtrl', function($scope, $state, $ionicSideMenuDelegate, $ionicModal, TodoService) {

  $scope.showDeleteButtons = false;
  $scope.todos = [];

  $scope.$on('$ionicView.beforeEnter', function(){
    $scope.todos = TodoService.getAll();
  });

  $scope.toggleLeft = function() {
    $ionicSideMenuDelegate.toggleLeft();
  };

  $scope.toggleRemoveItems = function() {
    if($scope.showDeleteButtons) $scope.showDeleteButtons = false;
    else $scope.showDeleteButtons = true;
  }

  // Create and load the Modal
  $ionicModal.fromTemplateUrl('partials/new-todo.html', function(modal) {
    $scope.todoModal = modal;
  }, {
    scope: $scope,
    animation: 'slide-in-up'
  });

  // Open our new todo modal
  $scope.addTodo = function() {
    $scope.todoModal.show();
  };

  // Close the new todo modal
  $scope.closeNewTodo = function() {
    $scope.todoModal.hide();
  };

  // Called when the form is submitted
  $scope.createTodo = function(todo) {
    TodoService.add(todo);
    $scope.todos = TodoService.getAll();
    $scope.todoModal.hide();
    todo.title = "";
  };

  // Open our new todo modal
  $scope.removeTodo = function(todoId) {
    TodoService.removeById(todoId);
    $scope.todos = TodoService.getAll();
  };

  // Open our new todo modal
  $scope.showSingleTodo = function(todoId) {
    $state.go('app.todo.single', {todoId: todoId});
  };

});
