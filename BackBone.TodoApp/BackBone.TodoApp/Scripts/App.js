'use strict';

var context = SP.ClientContext.get_current();
var user = context.get_web().get_currentUser();

var app = app || {};
var ENTER_KEY = 13;

// Este código se ejecuta cuando el DOM está preparado y crea un objeto de contexto necesario para poder usar el modelo de objetos de SharePoint
$(document).ready(function () {
    _.templateSettings = {
        interpolate: /\{\{(.+?)\}\}/g,   // print value: {{ value_name }}
        evaluate: /\{%([\s\S]+?)%\}/g,   // excute code: {% code_to_execute %}
        escape: /\{%-([\s\S]+?)%\}/g     // excape HTML: {%- <script> %} prints &lt;script&gt;
    };

    $(function () {
        // Kick things off by creating the **App**.
        new app.AppView();
    });
});
