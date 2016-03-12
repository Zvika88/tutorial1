/// <reference path="../app.ts"/>

angular.module('ioneazly').factory('TodoService', function($localStorage) {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var defaultTodos = [{
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

  return {

    getAll: function() {
      var persistedTodos = $localStorage.getObject('todos');
      if (!(persistedTodos instanceof Array)) {
        persistedTodos = defaultTodos;
        $localStorage.setObject('todos', defaultTodos);
      }
      return persistedTodos;
    },

    removeById: function(todoId) {
      var persistedTodos = $localStorage.getObject('todos');
      for (var i = 0; i < persistedTodos.length; i++) {
        if (persistedTodos[i].id === todoId) {
          persistedTodos.splice(i, 1);
          $localStorage.setObject('todos', persistedTodos);
          break;
        }
      }
    },

    findById: function(todoId) {
      var persistedTodos = $localStorage.getObject('todos');
      for (var i = 0; i < persistedTodos.length; i++) {
        if (persistedTodos[i].id === parseInt(todoId)) {
          return persistedTodos[i];
        }
      }
      return null;
    },

    add: function(todo) {
      var persistedTodos = $localStorage.getObject('todos');
      if (!persistedTodos) persistedTodos = [];
      todo.id = persistedTodos.length;
      persistedTodos.unshift(todo);
      $localStorage.setObject('todos', persistedTodos);
    },

    updateById: function(todoId, todo) {
      var persistedTodos = $localStorage.getObject('todos');
      for (var i = 0; i < persistedTodos.length; i++) {
        if (persistedTodos[i].id === parseInt(todoId)) {
          persistedTodos[i] = todo;
          break;
        }
      }
      $localStorage.setObject('todos', persistedTodos);
    }

  };
});
