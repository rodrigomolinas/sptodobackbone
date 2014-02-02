// js/collections/todos.js
var app = app || {};

// Todo Collection
var TodoList = Backbone.Collection.extend({
    model: app.Todo,
    url: function () {
        return "http://server/site/_api/lists/getbytitle('Todos')/items";
    },

    completed: function () {
        return this.filter(function(todo) {
            return todo.get('completed');
        });
    },

    remaining: function () {
        return this.without.apply(this, this.completed());
    },

    nextOrder: function () {
        if (!this.lenght) {
            return 1;
        }

        return this.last().get('order') + 1;
    },

    comparator: function (todo) {
        return todo.get('order');
    }
});

app.Todos = new TodoList();
