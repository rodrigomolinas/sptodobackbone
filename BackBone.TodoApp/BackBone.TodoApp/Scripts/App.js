'use strict';

var context = SP.ClientContext.get_current();
var app = app || {};
var ENTER_KEY = 13;

var web = context.get_web();
context.load(web);
context.executeQueryAsync(Function.createDelegate(this, onWebSuccess), Function.createDelegate(this, onWebFail));

function onWebSuccess(sender, args) {
    new app.AppView();
}

function onWebFail(sender, args) {
    alert('Getting the web failed');
}

// Este código se ejecuta cuando el DOM está preparado y crea un objeto de contexto necesario para poder usar el modelo de objetos de SharePoint
$(document).ready(function () {
    _.templateSettings = {
        interpolate: /\{\{(.+?)\}\}/g,   // print value: {{ value_name }}
        evaluate: /\{%([\s\S]+?)%\}/g,   // excute code: {% code_to_execute %}
        escape: /\{%-([\s\S]+?)%\}/g     // excape HTML: {%- <script> %} prints &lt;script&gt;
    };
});