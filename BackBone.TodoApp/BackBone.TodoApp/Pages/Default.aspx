<%-- Las 4 líneas siguientes son directivas ASP.NET necesarias cuando se usan componentes de SharePoint --%>

<%@ Page Inherits="Microsoft.SharePoint.WebPartPages.WebPartPage, Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" MasterPageFile="~masterurl/default.master" Language="C#" %>

<%@ Register TagPrefix="Utilities" Namespace="Microsoft.SharePoint.Utilities" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="WebPartPages" Namespace="Microsoft.SharePoint.WebPartPages" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>
<%@ Register TagPrefix="SharePoint" Namespace="Microsoft.SharePoint.WebControls" Assembly="Microsoft.SharePoint, Version=15.0.0.0, Culture=neutral, PublicKeyToken=71e9bce111e9429c" %>

<%-- El marcado y el script del elemento Content siguiente se pondrán en el elemento <head> de la página --%>
<asp:Content ContentPlaceHolderID="PlaceHolderAdditionalPageHead" runat="server">
    <script type="text/javascript" src="../Scripts/jquery-1.7.1.min.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.runtime.js"></script>
    <script type="text/javascript" src="/_layouts/15/sp.js"></script>
    <script src="../Scripts/underscore.js"></script>
    <script type="text/javascript" src="../Scripts/backbone-min.js"></script>
    <script type="text/javascript" src="../Scripts/Models/todo.js"></script>
    <script type="text/javascript" src="../Scripts/Collections/todos.js"></script>
    <script type="text/javascript" src="../Scripts/Views/todos.js"></script>
    <script type="text/javascript" src="../Scripts/Views/app.js"></script>
    <script type="text/javascript" src="../Scripts/Routers/router.js"></script>

    <!-- Agregue sus estilos CSS al siguiente archivo -->
    <link rel="Stylesheet" type="text/css" href="../Content/App.css" />
    <link rel="Stylesheet" type="text/css" href="../Content/base.css" />

    <!-- Agregue el código JavaScript al siguiente archivo -->
    <script type="text/javascript" src="../Scripts/App.js"></script>
</asp:Content>

<%-- El marcado del elemento Content siguiente se pondrá en el elemento TitleArea de la página --%>
<asp:Content ContentPlaceHolderID="PlaceHolderPageTitleInTitleArea" runat="server">
    TODOs
</asp:Content>

<%-- El marcado y el script del elemento Content siguiente se pondrán en el elemento <body> de la página --%>
<asp:Content ContentPlaceHolderID="PlaceHolderMain" runat="server">
    <script type="text/template" id="item-template">
        <div class="view">
        <input class="toggle" type="checkbox" {%= completed ? 'checked' : '' %} />
        <label>{%- title %}</label>
        <button class="destroy"></button>
        </div>
        <input class="edit" value="{%- title %}" />
    </script>
    <script type="text/template" id="stats-template">
        <span id="todo-count">
        <strong>{%= remaining %}</strong>
        {%= remaining === 1 ? 'item' : 'items' %} left
        </span>
        <ul id="filters">
            <li>
                <a class="selected" href="#/">All</a>
            </li>
            <li>
                <a href="#/active">Active</a>
            </li>
            <li>
                <a href="#/completed">Completed</a>
            </li>
        </ul>
        {% if (completed) { %}
        <button id="clear-completed">Clear completed ({%= completed %})</button>
        {% } %}
    </script>
    <div id="todoapp">
        <div id="header">
            <h1>todos</h1>
            <input id="new-todo" placeholder="What needs to be done?" autofocus>
        </div>
        <div id="main">
            <input id="toggle-all" type="checkbox" />
            <label for="toggle-all">Mark all as complete</label>
            <ul id="todo-lists"></ul>
        </div>
        <div id="footer"></div>
    </div>

</asp:Content>
