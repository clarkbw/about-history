'use strict';

const { PageMod } = require('sdk/page-mod');
const { data } = require('sdk/self');
const { getFavicon } = require("sdk/places/favicon");
const tabs = require('sdk/tabs');

const about = require('pathfinder/scheme/about');

const database = require('./metadata/database');
const { history } = require('./history');

const historyDataUrl = data.url('history.html');
const aboutHistory = 'about:history';

// create about:history url handler
about.add({
  what: 'history',
  url: historyDataUrl,
  content: data.load('history.html')
});

// setup a page-mod to pipe information for about:history
PageMod({
  include: aboutHistory,
  contentScriptFile: data.url("history-pagemod.js"),
  attachTo: ["existing", "top"],
  contentScriptWhen: "start",
  onAttach: worker => {
    let resetHistory = reset.bind(null, worker);

    worker.port.on("history:events:click", function (href) {
      tabs.open(href);
    });

    worker.port.on("history:events:query", function (query) {
      if (query.length <= 0) {
        history().then(resetHistory);
      } else {
        history({query:query}).then(resetHistory);
      }
    });
  }
});

function reset(worker, r) {
  worker.port.emit("history:reset", r);

  r.forEach(function (item) {
    var url = item.url;
    getFavicon(url).then(function (icon_url) {
      worker.port.emit("icon:set", { url : url, icon_url: icon_url });
      return icon_url;
    });

    database.get(url).then(function(metas) {
      if (metas) {
        worker.port.emit("url:meta", metas);
      }
    });
  });
}
