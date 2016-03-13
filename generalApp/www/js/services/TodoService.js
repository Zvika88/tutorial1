/// <reference path="../app.ts"/>
var TodoService = (function () {
    TodoService.$inject = ['$localStorage'];
    function TodoService($localStorage) {
        this.$localStorage = $localStorage;
        this.defaultTodos = [];
        /**
         * Get all objects
         * @returns {*}
         */
        this.getAll = function () {
            var persistedTodos = this.$localStorage.getObject('todos');
            if (!(persistedTodos instanceof Array)) {
                persistedTodos = this.defaultTodos;
                this.$localStorage.setObject('todos', this.defaultTodos);
            }
            return persistedTodos;
        };
        /**
         * Remove object by id
         * @param todoId
         */
        this.removeById = function (todoId) {
            var persistedTodos = this.$localStorage.getObject('todos');
            for (var i = 0; i < persistedTodos.length; i++) {
                if (persistedTodos[i].id === todoId) {
                    persistedTodos.splice(i, 1);
                    this.$localStorage.setObject('todos', persistedTodos);
                    break;
                }
            }
        };
        /**
         * Find object by id
         * @param todoId
         * @returns {any}
         */
        this.findById = function (todoId) {
            var persistedTodos = this.$localStorage.getObject('todos');
            for (var i = 0; i < persistedTodos.length; i++) {
                if (persistedTodos[i].id === todoId) {
                    return persistedTodos[i];
                }
            }
            return null;
        };
        /**
         * Add an object to the main list
         * @param todo
         */
        this.add = function (todo) {
            var persistedTodos = this.$localStorage.getObject('todos');
            if (!persistedTodos)
                persistedTodos = [];
            todo.id = persistedTodos.length;
            persistedTodos.unshift(todo);
            this.$localStorage.setObject('todos', persistedTodos);
        };
        /**
         * Update element by id and set the properties of passed object
         * @param todoId
         * @param todo
         */
        this.updateById = function (todoId, todo) {
            var persistedTodos = this.$localStorage.getObject('todos');
            for (var i = 0; i < persistedTodos.length; i++) {
                if (persistedTodos[i].id === todoId) {
                    persistedTodos[i] = todo;
                    break;
                }
            }
            this.$localStorage.setObject('todos', persistedTodos);
        };
        this.defaultTodos = [{
                id: 0,
                title: 'Ben Sparrow',
                lastText: 'You on your way?',
                face: 'img/ben.png'
            }, {
                id: 1,
                title: 'Max Lynx',
                lastText: 'Hey, it\'s me',
                face: 'img/max.png'
            }, {
                id: 2,
                title: 'Adam Bradleyson',
                lastText: 'I should buy a boat',
                face: 'img/adam.jpg'
            }, {
                id: 3,
                title: 'Perry Governor',
                lastText: 'Look at my mukluks!',
                face: 'img/perry.png'
            }, {
                id: 4,
                title: 'Mike Harrington',
                lastText: 'This is wicked good ice cream.',
                face: 'img/mike.png'
            }];
    }
    return TodoService;
}());
angular.module('ioneazly').service('TodoService', TodoService);
