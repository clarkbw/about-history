var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Header = require('./header.jsx');

module.exports = React.createClass({
  render() {
    'use strict';
    return (
      <div>
        <div className='container'>
          <RouteHandler />
        </div>
      </div>
    );
  }
});
