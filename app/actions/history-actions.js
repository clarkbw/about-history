var alt = require('../alt-application.js');
var superagent = require('superagent');
var moment = require('moment');
var _ = require('lodash');

// let's just admit that this sucks and we need to find a better way
var addon = window.addon || { emit : function() { console.log(arguments); },
                              on: function() { console.log(arguments); } };

class HistoryActions {
  constructor() {
    addon.on('history:reset', items => {
      this.actions.reset(items);
    });
    addon.on('history:add', item => {
      this.actions.add(item);
    });
    addon.on('history:removed', item => {
      this.actions.removed(item);
    });

    addon.on('url:icon', icon => {
      this.actions.updateIcon(icon);
    });
    addon.on('url:meta', meta => {
      this.actions.updateMeta(meta);
    });
    addon.on('url:bookmark', bookmark => {
      this.actions.bookmarked(bookmark);
    });
    addon.on('bookmark:removed', bookmark => {
      this.actions.notBookmarked(bookmark);
    });
  }
  reset(items) {
    this.dispatch(items);
  }
  add(item) {
    this.dispatch(item);
  }
  removed(item) {
    this.dispatch(item);
  }

  updateIcon(icon) {
    this.dispatch(icon);
  }
  updateMeta(meta) {
    this.dispatch(meta);
  }
  bookmarked(bookmark) {
    this.dispatch(bookmark);
  }
  notBookmarked(bookmark) {
    this.dispatch(bookmark);
  }

  search(date, query) {
    addon.emit('history:events:query', {
      from: moment(date).startOf('day').format('X') * 1000,
      to: moment(date).endOf('day').format('X') * 1000,
      query: query.trim()
    });
    this.dispatch();
  }

  remove(url) {
    addon.emit('history:events:delete', url);
    this.dispatch();
  }

  removeRelated(url) {
    addon.emit('history:events:delete-related',  url);
  }
}

module.exports = alt.createActions(HistoryActions);
