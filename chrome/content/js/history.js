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
    return this.get(list.find(key => {
      let value = this.get(key);
      return (value != null && value.length > 0);
    }));
  },
  // some standard and convenience methods for info
  title : function () {
    return this._getNotNull(["twitter:title", "og:title", "title"]);
  },
  selected : function () {
    return (this.get('selected') || false) ? "selected" : "";
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
    return this._getNotNull(["icon:fluid-icon", "twitter:image", "twitter:image:src", "og:image"]);
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
    "click .circle, hr": "onSelect",
    "click .action-expand" : "onClickHistoryExpand",
    "click .action-ellipsis" : "onClickEllipsisExpand",
    "click #action-delete" : "onDelete",
    "click #action-delete-related" : "onDeleteRelated"
  },
  className : "history",
  tagName : "li",
  template : _.template($('#history-item-template').html()),
  initialize: function initialize() {
    this.model.on('change', _ => this.render());
    this.model.on('destroy', _ => this.remove());
  },
  render : function render() {
    this.$el.html(this.template(this.model));
    this.$el.find('.time').tooltip();
    this.$el.find('img.image').error(({ target }) => {
      target.classList.add("hide");
    }).attr('src', this.model.image());
    return this;
  },
  onClickEllipsisExpand : function () {
    this.$el.find("button.action-expand").button('toggle');
    return this.onClickHistoryExpand();
    return false;
  },
  onClickHistoryExpand : function () {
    // toggle the actual meta information
    this.$el.find(".meta").toggleClass("hidden");
    // toggle the ... which indicates there is a description
    this.$el.find(".action-ellipsis").toggleClass("hidden");
    this.$el.find("button.action-expand").toggleClass("active");
    return false;
  },
  onSelect: function() {
    let selected = !this.model.get("selected");
    this.model.set("selected", selected);
    return false;
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
    this.collection.each(item => {
      var view = new HistoryItemView({model: item, id : item.id});
      this.$el.append(view.render().$el);
    });
  return this;
  }
});

var SearchInputView = Backbone.View.extend({
  events : {
    "keyup" : "onKeyUp"
  },
  initialize: function(options) {
    this.datePickerView = options.datePickerView;
  },
  onKeyUp : function (e) {
    // on ESC clear the search
    if (e.keyCode == 27) {
      this.$el.val("");
    }
    sendQuery({
      date: this.datePickerView.model.date(),
      query: $("#query").val()
    });
    // possibly debounce every second to set the query
    // this.router.navigate("#query/query");
  }
});

function sendQuery({ date, query }) {
  addon.emit("history:events:query", {
    from: moment(date).startOf('day').format("X") * 1000,
    to: moment(date).endOf('day').format("X") * 1000,
    query: query.trim()
  });
}

var DateModel = Backbone.Model.extend({
  subtractDay : function () {
    var m = this.moment().subtract('days', 1);
    this.set('date', m.toJSON());
  },
  addDay : function () {
    var m = this.moment().add('days', 1);
    this.set('date', m.toJSON());
  },
  isSameDay: (day1, day2) => {
    return day1.isSame(day2, 'day') &&
           day1.isSame(day2, 'month') &&
           day1.isSame(day2, 'year')
  },
  isYesterday: function() {
    return this.isSameDay(moment().subtract('days', 1), this.moment());
  },
  isToday : function () {
    return this.isSameDay(moment(), this.moment());
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
    if (this.model.isSameDay(moment().add('days', 1), this.model.moment())) {
      this.$el.text("Beyond");
      this.$el.addClass("hide");
    }
    else if (this.model.isToday()) {
      this.$el.text("Tomorrow");
      this.$el.removeClass("hide");
    }
    else if (this.model.isYesterday()) {
      this.$el.text("Today");
      this.$el.removeClass("hide");
    }
    else if (this.model.isSameDay(moment().subtract('days', 2), this.model.moment())) {
      this.$el.text("Yesterday");
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
      sendQuery({
        date: this.model.date(),
        query: $("#query").val()
      });
    }, this);

    this.back = new BackDateStepView({ model : this.model, el : $("#date-back") });
    this.forward = new ForwardDateStepView({ model : this.model, el : $("#date-forward") });
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
  initialize: function initialize() {
    var hl = this.historyList = new HistoryList();
    this.historyListView = new HistoryListView({
      collection : this.historyList,
      el : $("#history-list-view")
    });
    this.datePickerView = new DatePickerView({
      model : new DateModel(),
      el : $("#date")
    });
    this.searchInputView = new SearchInputView({
      el : $("#query"),
      datePickerView: this.datePickerView
    });

    addon.on("history:reset", items => {
      if (Array.isArray(items)) {
        hl.reset(items.map(i => new HistoryItem(i)));
      }
    });

    // this will help get single history additions
    addon.on("history:add", item => {
      var hi = hl.findWhere({ url : item.url });
      if (hi) {
        hi.set(item);
      } else {
        hl.add(new HistoryItem(item), { at: 0 });
      }
    });

    this.router = new HistoryRouter();
    Backbone.history.start({pushState: false});

    // ######### INIT DATE #############
    // This causes our initial load of the current date
    this.datePickerView.model.setDate(new Date());
  }
});

var HistoryApp = new Application({el : $("#history-items")});
