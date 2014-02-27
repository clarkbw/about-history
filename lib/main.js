
const { search } = require('sdk/places/history');
const { merge } = require("sdk/util/object");
const { getFavicon } = require("sdk/places/favicon");

const { defer } = require('sdk/core/promise');

const { Cu } = require('chrome');
const { data } = require('sdk/self');
const { URL } = require('sdk/url');

const tabs = require("sdk/tabs");
const historyDataUrl = data.url('history.html');
const ABOUT_HISTORY = 'about:history';

const database = require('./metadata/database');

// start collecting metadata
require('./metadata/cards');

require('./ui/overwrites');

const about = require('pathfinder/scheme/about');
about.add({
  what: 'history',
  url: historyDataUrl,
  content: data.load('history.html')
});

function normalize(historyObj) {
  var u = URL(historyObj.url);
  historyObj["host"] = u.host;
  historyObj["scheme"] = u.scheme;
  historyObj["icon"] = "";
  return historyObj;
}

function history(options) {
  var deferred = defer();
  // query, url, from, to
  options = merge({ redirectsMode : 2 }, options);

  if (typeof options.query === "undefined" && typeof options.domain === "undefined") {
    options = merge({
      from: Date.now - (60*60*24*7)
    }, options);
  }

  search([options], {count: 50, sort: "dateAdded", descending: true }).on("end", function (results) {
    results = results.map(function (r) {
      return normalize(r);
      // filter out NULL history items because redirectsMode isn't working
    }).filter(function (item) { return item.title !== null });
    deferred.resolve(results);
  });
  return deferred.promise;
}

require("sdk/page-mod").PageMod({
  include: ABOUT_HISTORY,
  contentScriptFile: [ data.url("js/jquery.min.js"),
                       data.url("js/moment-with-langs.min.js"),
                       data.url("js/underscore-min.js"),
                       data.url("js/backbone-min.js"),
                       data.url("history-pagemod.js")],
  attachTo: ["existing", "top"],
  onAttach: function(worker) {

    function resetHistory(r) {
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

    history().then(resetHistory);

  }
});
