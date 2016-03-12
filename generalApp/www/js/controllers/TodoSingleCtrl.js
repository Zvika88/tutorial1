/// <reference path="../app.ts"/>
"use strict";
angular.module('ioneazly').controller('TodoSingleCtrl', function ($stateParams, $scope, $ionicHistory, TodoService) {
    $scope.goBack = function () {
        $ionicHistory.goBack();
    };
    $scope.todo = TodoService.findById($stateParams.todoId);
    if ($scope.todo.dueDate)
        $scope.todo.dueDate = new Date($scope.todo.dueDate);
    $scope.saveTodo = function () {
        TodoService.updateById($scope.todo.id, $scope.todo);
        $ionicHistory.goBack();
    };
});