"use strict";

const tabs = require('sdk/tabs');

require("about-history/main");

exports["test about:history"] = function(assert, done) {
  tabs.open({
    url: "about:history",
    inBackground: true,
    onLoad: function(tab) {
      assert.equal(tab.url, 'about:history', 'the tab url is correct');
      assert.equal(tab.title, 'about:history', 'the tab title is correct');
      tab.close(done);
    }
  })
};

require("sdk/test").run(exports);
