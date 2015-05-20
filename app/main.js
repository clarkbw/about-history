var React = require('react');
var $ = require('jquery');
var Router = require('react-router');
var routes = require('./routes.jsx');
var App = require('./views/app.jsx');

$(function() {
  'use strict';
  // Router.run(routes, Router.StaticLocation, function(Handler) {
    React.render(<App />, document.getElementById('app'));
  // });
});
