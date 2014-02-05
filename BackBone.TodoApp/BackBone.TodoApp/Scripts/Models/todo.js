// js/models/todo.js

var app = app || {};

// Todo Model

app.Todo = Backbone.Model.extend({
    defaults: {
        Title: '',
        completed: false
    },

    toggle: function () {
        this.save({
            completed: !this.get('completed')
        });
    }
});