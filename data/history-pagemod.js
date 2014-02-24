
var HistoryRouter = Backbone.Router.extend({
  // routes: {
  //   "query/:type/:id"     :   "query",
  //   "list/:id"            :   "list"
  // }
});

var HistoryItem = Backbone.Model.extend({
  initialize : function initialize(model, options) {
    this.set("time", moment(parseInt(model.time)));
  },
  isSecure : function () {
    return (this.get("scheme") === "https");
  }
});

var HistoryItemView = Backbone.View.extend({
  events : {
    "click" : "onClickHistoryItemView"
  },
  className : "history list-group-item",
  tagName : "li",
  template : _.template($('#history-item-template').html()),
  initialize: function initialize() {
    this.model.on('change', this.render, this);
  },
  render : function render() {
    this.$el.html(this.template(this.model));
    return this;
  },
  onClickHistoryItemView : function () {
    self.port.emit("history:events:click", this.model.get("url"));
  }
});

var HistoryList = Backbone.Collection.extend({
  model : HistoryItem,
  initialize : function initialize() {
    var that = this;
    self.port.on("icon:set", function (icon) {
      var model = that.findWhere({ url : icon.url });
      if (model) {
        model.set("icon", icon.icon_url);
      }
    });
  },
  render : function render() {
    this.$el.html(this.template(this.model));
    return this;
  },
  comparator : function comparator(historyItem) {
      return -1 * historyItem.get("time");
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
    this.collection.each(function (historyItem) {
      var view = new HistoryItemView({model: historyItem, id : historyItem.id});
      this.$el.append(view.render().$el);
    }.bind(this));
  return this;
  }
});

var Application = Backbone.View.extend({
  events : {
    
  },
  initialize: function initialize() {
    var hl = this.historyList = new HistoryList();
    this.historyListView = new HistoryListView({ collection : this.historyList, el : $("#history-list-view") });

    self.port.on("history:reset", function(items) {
      if (items && Array.isArray(items)) {
        hl.reset(items.map(function(i) { return new HistoryItem(i); }));
      }
    });

    // this will help get single history additions
    self.port.on("history:add", function(item) {
      if (item) {
        console.log("ITEM", item);
        hl.add(new HistoryItem(item));
      } else {
        console.log("NOT ITEM", item);
      }
    });

    this.router = new HistoryRouter();
    Backbone.history.start({pushState: false});

    // this.router.navigate("#query/topic/1001");
  }
});

var HistoryApp = new Application({el : $("#history-items")});

