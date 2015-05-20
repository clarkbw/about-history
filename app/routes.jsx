var React = require('react');
var Router = require('react-router');
var { Route } = Router;
var App = require('./views/app.jsx');
var History = require('./views/history-list.jsx');

module.exports = (
  <Route handler={App} path='/'>
    <Route name='history-list' handler={History} path='/' />
  </Route>
);
// <Route name='repo-details' handler={RepoDetails} path='/repo/:owner/:name' />
