﻿// js/views/app.js

var app = app || {};

$(document).ready(function () {
    app.AppView = Backbone.View.extend({
        el: '#todoapp',

        statsTemplate: _.template($('#stats-template').html()),

        events: {
            'keypress #new-todo': 'createOnEnter',
            'click #clear-completed': 'clearCompleted',
            'click #toggle-all': 'toggleAllComplete'
        },

        initialize: function () {
            this.allCheckbox = this.$('#toggle-all')[0];
            this.$input = this.$('#new-todo');
            this.$footer = this.$('#footer');
            this.$main = this.$('#main');

            this.listenTo(app.Todos, 'add', this.addOne);
            this.listenTo(app.Todos, 'reset', this.addAll);
            this.listenTo(app.Todos, 'change:completed', this.filterOne);
            this.listenTo(app.Todos, 'filter', this.filterAll);
            this.listenTo(app.Todos, 'all', this.render);

            app.Todos.fetch({
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('Accept', 'application/json;odata=verbose');
                }
            });
        },

        render: function () {
            var completed = app.Todos.completed().lenght;
            var remaining = app.Todos.remaining().lenght;

            if (app.Todos.lenght) {
                this.$main.show();
                this.$footer.show();

                this.$footer.html(this.statsTemplate({
                    completed: completed,
                    remaining: remaining
                }));

                this.$('#filters li a')
                .removeClass('selected')
                .filter('[href="#/' + (app.TodoFilter || '') + '"]')
                .addClass('selected');
            }
            else {
                this.$main.hide();
                this.$footer.hide();
            }

            this.allCheckbox.checked = !remaining;
        },

        addOne: function (todo) {
            var view = new app.TodoView({ model: todo });
            $('#todo-list').append(view.render().el);
        },

        addAll: function () {
            this.$('#todo-list').html('');
            app.Todos.each(this.addOne, this);
        },

        filterOne: function (todo) {
            todo.trigger('visible');
        },

        filterAll: function () {
            app.Todos.each(this.filterOne, this);
        },

        newAttributes: function () {
            return {
                Title: this.$input.val().trim(),
                order: app.Todos.nextOrder(),
                completed: false
            };
        },

        createOnEnter: function (event) {
            if (event.which !== ENTER_KEY || !this.$input.val().trim()) {
                return;
            }

            app.Todos.create(this.newAttributes());
            this.$input.val('');
        },

        clearCompleted: function () {
            _.invoke(app.Todos.completed(), 'destroy');
            return false;
        },

        toggleAllComplete: function () {
            var completed = this.allCheckbox.checked;

            app.Todos.each(function (todo) {
                todo.save({
                    'completed': completed
                });
            });
        }
    })
});

