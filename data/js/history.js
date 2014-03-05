/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
'use strict';

var HistoryRouter = Backbone.Router.extend({
  // routes: {
  //   "query/:type/:id"     :   "query",
  //   "list/:id"            :   "list"
  // }
});

var HistoryItem = Backbone.Model.extend({
  initialize : function initialize(model, options) {
    this.set("time", moment(model.time));
    if (this.get("twitter:creator") == this.get("twitter:site")) {
      this.unset("twitter:creator");
    }
    ["twitter:creator", "twitter:site"].forEach(function (t) {
      if (this.has(t) && !/^[@A-Za-z0-9_]{1,15}$/.test(this.get(t))) {
        this.unset(t);
      }
    }, this);
  },
  _getNotNull : function (list) {
    return this.get(_.find(list, function (key) { return (this.get(key) != null && this.get(key).length > 0); }, this));
  },
  // some standard and convenience methods for info
  title : function () {
    return this._getNotNull(["twitter:title", "og:title", "title"]);
  },
  favicon : function () {
    return this.get('icon');
  },
  description : function () {
    return this._getNotNull(["twitter:description", "og:description"]);
  },
  hasImage : function () {
    return (this.image() != null);
  },
  isBookmarked : function () {
    return !!this.get('bookmarked');
  },
  image : function () {
    return this._getNotNull(["twitter:image", "twitter:image:src", "og:image"]);
  },
  isSecure : function () {
    return (this.get("scheme") === "https");
  },
  twitterURL : function (handle) {
    if (handle) {
      return "https://twitter.com/" + handle.replace(/^@/, '');
    }
  }
});

var HistoryItemView = Backbone.View.extend({
  events : {
    "click .action-expand" : "onClickHistoryExpand",
    "click .action-ellipsis" : "onClickEllipsisExpand",
    "click #action-delete" : "onDelete",
    "click #action-delete-related" : "onDeleteRelated"
  },
  className : "history",
  tagName : "li",
  template : _.template($('#history-item-template').html()),
  initialize: function initialize() {
    this.model.on('change', this.render, this);
    this.model.on('destroy', this.remove, this);
  },
  render : function render() {
    this.$el.html(this.template(this.model));
    return this;
  },
  onClickEllipsisExpand : function () {
    this.$el.find("button.action-expand").button('toggle');
    return this.onClickHistoryExpand();
  },
  onClickHistoryExpand : function () {
    // toggle the actual meta information
    this.$el.find(".meta").toggleClass("hidden");
    // toggle the ... which indicates there is a description
    this.$el.find(".action-ellipsis").toggleClass("hidden");
  },
  onDelete: function () {
    addon.emit("history:events:delete", this.model.get("url"));
    return false;
  },
  onDeleteRelated: function() {
    addon.emit("history:events:delete-related", this.model.get("url"));
    return false;
  }
});

function normalize(obj) {
  var value = "";
  var keys = _.rest(arguments);
  _.each(keys, function (k) {
    if (_.has(obj, k) && obj[k] !== null) {
      value = obj[k];
    }
  });
  return value;
}

var HistoryList = Backbone.Collection.extend({
  model : HistoryItem,
  initialize : function initialize() {
    addon.on("url:icon", icon => {
      if (!icon) { return; }
      var model = this.findWhere({ url : icon.url });
      if (model) {
        model.set("icon", icon.icon_url);
      }
    });

    addon.on("url:meta", metas => {
      if (!metas) { return; }
      var model = this.findWhere({ url : metas.url });
      if (model) {
        model.set(metas);
      }
    });

    addon.on("url:bookmark", ({ url }) => {
      var model = this.findWhere({ url : url });
      if (model)
        model.set("bookmarked", true);
    })

    addon.on("bookmark:removed", ({ url }) => {
      var model = this.findWhere({ url : url });
      if (model)
        model.set("bookmarked", false);
    })

    addon.on("history:removed", ({ url }) => {
      var model = this.findWhere({ url : url });

      if (model) {
        model.destroy();
      }
    });
  },
  render : function render() {
    this.$el.html(this.template(this.model));
    return this;
  }
});

var HistoryListView = Backbone.View.extend({
  tagName : "ul",
  className : "history-list",
  initialize: function initialize() {
    this.collection.on('reset', this.render, this);
    this.collection.on('add', this.render, this);
  },
  render: function () {
    this.$el.empty();
    this.collection.each(function (historyItem) {
      var view = new HistoryItemView({model: historyItem, id : historyItem.id});
      this.$el.append(view.render().$el);
    }.bind(this));
  return this;
  }
});

var SearchInputView = Backbone.View.extend({
  events : {
    "keyup" : "onKeyUp"
  },
  onKeyUp : function (e) {
    // on ESC clear the search
    if (e.keyCode == 27) {
      this.$el.val("");
    }
    addon.emit("history:events:query", this.$el.val());
    // possibly debounce every second to set the query
    // this.router.navigate("#query/query");
  }
});

var DateModel = Backbone.Model.extend({
  subtractDay : function () {
    var m = this.moment().subtract('days', 1);
    this.set('date', m.toJSON());
  },
  addDay : function () {
    var m = this.moment().add('days', 1);
    this.set('date', m.toJSON());
  },
  isYesterday: function() {
    var m = this.moment();
    var yesterday = moment().subtract('days', 1);
    return yesterday.isSame(m, 'day') &&
           yesterday.isSame(m, 'month') &&
           yesterday.isSame(m, 'year');
  },
  isToday : function () {
    var m = this.moment();
    var now = moment();
    return now.isSame(m, 'day') &&
           now.isSame(m, 'month') &&
           now.isSame(m, 'year');
  },
  setDate : function (date) {
    this.set('date', moment(date).startOf('day').toJSON());
  },
  moment : function () {
    return moment(this.get('date'));
  },
  date : function () {
    return this.moment().toDate();
  }
});

var BackDateStepView = Backbone.View.extend({
  events : {
    "click" : "onClick"
  },
  onClick : function () {
    this.model.subtractDay();
  },
  initialize: function initialize() {
    this.model.on("change", this.render, this);
  },
  render: function () {
    if (this.model.isToday()) {
      this.$el.text("Yesterday");
    } else {
      this.$el.text("Back");
    }
    return this;
  }
});

var ForwardDateStepView = Backbone.View.extend({
  events : {
    "click" : "onClick"
  },
  onClick : function () {
    this.model.addDay();
  },
  initialize: function initialize() {
    this.model.on("change", this.render, this);
  },
  render: function () {
    if (this.model.isToday()) {
      this.$el.text("Tomorrow");
      this.$el.addClass("hide");
    }
    else if (this.model.isYesterday()) {
      this.$el.text("Today");
      this.$el.removeClass("hide");
    }
    else {
      this.$el.text("Forward");
      this.$el.removeClass("hide");
    }
    return this;
  }
});

var DatePickerView = Backbone.View.extend({
  events : {
    "click" : "onClick",
    "changeDate" : "onChangeDate"
  },
  onClick : function () {
    this.$el.datepicker('show');
  },
  onChangeDate : function (e) {
    this.model.setDate(e.date);
  },
  initialize: function initialize() {
    this.model.on("change", this.render, this);
    this.model.on("change", function () {
      addon.emit("history:events:query", {
        date: this.model.date(),
        query: $("#query").val().trim()
      });
    }, this);

    this.back = new BackDateStepView({ model : this.model, el : $("#date-back") });
    this.forward = new ForwardDateStepView({ model : this.model, el : $("#date-forward") });

    this.model.setDate(new Date());
  },
  render: function () {
    var date = this.model.date();
    var tomorrow = moment().add('days', 1).toDate();
    this.$el.datepicker({ autoclose : true, todayHighlight : true, endDate : tomorrow });
    this.$el.datepicker('setDate', date);
    this.$el.text(moment(date).format("dddd, MMMM Do" + ((moment().isSame(date, 'year')) ? "" : " YYYY")));
    return this;
  }
});

var Application = Backbone.View.extend({
  events : {

  },
  initialize: function initialize() {
    var hl = this.historyList = new HistoryList();
    this.historyListView = new HistoryListView({ collection : this.historyList, el : $("#history-list-view") });
    this.searchInputView = new SearchInputView({ el : $("#query") });
    this.datePickerView = new DatePickerView({ model : new DateModel() ,el : $("#date") });

    addon.on("history:reset", function(items) {
      if (items && Array.isArray(items)) {
        hl.reset(items.map(function(i) { return new HistoryItem(i); }));
      }
    });

    // this will help get single history additions
    addon.on("history:add", function(item) {
      var hi;
      if (item) {
        hi = hl.findWhere({ url : item.url });
        if (!hi) {
          hl.add(new HistoryItem(item));
        } else {
          hi.set(item);
        }
      }
    });

    this.router = new HistoryRouter();
    Backbone.history.start({pushState: false});

  }
});

var HistoryApp = new Application({el : $("#history-items")});

window.addEventListener('load', function onLoad() {
  window.removeEventListener('load', onLoad, false);
  addon.emit("history:events:query", "");
}, false);
