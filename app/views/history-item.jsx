'use strict';
var React = require('react/addons');
var HistoryStore = require('../stores/history-store.js');
var HistoryActions = require('../actions/history-actions.js');

module.exports = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  getInitialState() {
    return HistoryStore.getState();
  },
  componentWillMount() {
    HistoryStore.listen(this.onChange);
  },
  componentWillUnmount() {
    HistoryStore.unlisten(this.onChange);
  },
  onChange() {
    this.setState(HistoryStore.getState());
  },
  renderImage() {
    if (this.props.item.image) {
      return (
        <div className='card-image waves-block waves-light'>
          <img src={ this.props.item.image } />
        </div>
      );
    }
    return '';
  },
  render() {
    return (
      <div className='col s6'>
        <div className='card animated flipInY'>
          { this.renderImage() }
          <div className='card-content'>
            <h5 className='truncate'>{ this.props.item.title }</h5>
            <div>
              <img src={ this.props.item.icon } />
               <span className='truncate  blue-grey-text lighten-4'>{ this.props.item.hostname }</span>
            </div>
            <p className='grey-text lighten-2'>{ this.props.item.meta.description }</p>
          </div>
          <div className='card-action'>
            <a href=''>Action</a>
            <a href=''>Action</a>
          </div>
        </div>
      </div>
    )
  }
})
