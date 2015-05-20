var React = require('react');
var History = require('./history-list.jsx');

var Header = require('./header.jsx');

module.exports = React.createClass({
  render() {
    'use strict';
    return (
      <div>
        <div className='container'>
          <History/>
        </div>
      </div>
    );
  }
});
