/// <reference path="../../../typings/main.d.ts"/>

class TodoSingleCtrl {

  constructor(public $stateParams:any,
              public $scope:any,
              public $ionicHistory:any,
              public TodoService:any) {

    $scope.goBack = function () {
      $ionicHistory.goBack();
    };

    $scope.todo = TodoService.findById(parseInt($stateParams.todoId));

    if ($scope.todo.dueDate)
      $scope.todo.dueDate = new Date($scope.todo.dueDate);

    $scope.saveTodo = function () {
      TodoService.updateById($scope.todo.id, $scope.todo);
      $ionicHistory.goBack();
    }
  }
}

angular.module('ioneazly').controller('TodoSingleCtrl', TodoSingleCtrl);
