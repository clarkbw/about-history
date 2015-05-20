var React = require('react');
var { Link } = require('react-router');

module.exports = React.createClass({
  render() {
    'use strict';
    return (
      <nav className='blue darken-2'>
        <div className='nav-wrapper container'>
          <Link to='history-list' className='brand-logo'>Your Web History</Link>
        </div>
      </nav>
    );
  }
});
