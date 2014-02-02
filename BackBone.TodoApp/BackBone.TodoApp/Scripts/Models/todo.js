﻿// js/models/todo.js

var app = app || {};

// Todo Model

app.Todo = Backbone.Model.extend({
    defaults: {
        title: '',
        completed: false
    },

    toggle: function () {
        this.save({
            completed: !this.get('completed')
        });
    }
});