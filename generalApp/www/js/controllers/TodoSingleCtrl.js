/// <reference path="../../../typings/main.d.ts"/>
var TodoSingleCtrl = (function () {
    TodoSingleCtrl.$inject = ['$stateParams', '$scope', '$ionicHistory', 'TodoService'];
    function TodoSingleCtrl($stateParams, $scope, $ionicHistory, TodoService) {
        this.$stateParams = $stateParams;
        this.$scope = $scope;
        this.$ionicHistory = $ionicHistory;
        this.TodoService = TodoService;
        $scope.goBack = function () {
            $ionicHistory.goBack();
        };
        $scope.todo = TodoService.findById(parseInt($stateParams.todoId));
        if ($scope.todo.dueDate)
            $scope.todo.dueDate = new Date($scope.todo.dueDate);
        $scope.saveTodo = function () {
            TodoService.updateById($scope.todo.id, $scope.todo);
            $ionicHistory.goBack();
        };
    }
    return TodoSingleCtrl;
}());
angular.module('ioneazly').controller('TodoSingleCtrl', TodoSingleCtrl);
