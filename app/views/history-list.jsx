'use strict';
var React = require('react/addons');
var HistoryItem = require('./history-item.jsx');
var HistoryStore = require('../stores/history-store.js');
var HistoryActions = require('../actions/history-actions.js');
var _ = require('lodash');

module.exports = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState() {
    return HistoryStore.getState();
  },
  componentWillMount() {
    HistoryStore.listen(this.onChange);
    HistoryActions.search(new Date(), '');
  },
  componentWillUnmount() {
    HistoryStore.unlisten(this.onChange);
  },
  onChange() {
    this.setState(HistoryStore.getState());
  },
  search(evt) {
    evt.preventDefault();
    var searchText = this.refs.searchText.getDOMNode().value;
    HistoryActions.search(new Date(), searchText);
  },
  renderHistory() {
    return _.map(this.state.items, (item) => {
      return (
        <HistoryItem item={item} />
      );
    });
  },
  renderLoading() {
    if (this.state.loading) {
      return (
        <div className='progress blue darken-2'>
          <div className='indeterminate blue lighten-3'></div>
        </div>
      );
    } else {
      return '';
    }
  },
  render() {
    return (
      <div>
        <form onSubmit={this.search}>
          <div className='input-field'>
            <label>Search Your History</label>
            <input type='text' ref='searchText'  />
          </div>
        </form>

        { this.renderLoading() }

        <div className='row'>
          { this.renderHistory() }
        </div>
      </div>
    );
  }
});
