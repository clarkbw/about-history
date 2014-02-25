
const { search } = require('sdk/places/history');
const { merge } = require("sdk/util/object");
const { getFavicon } = require("sdk/places/favicon");

const { promised, defer } = require('sdk/core/promise');

const { Cu } = require('chrome');
const { data } = require('sdk/self');
const { URL } = require('sdk/url');

const tabs = require("sdk/tabs");
const historyDataUrl = data.url('history.html');
const aboutHistory = 'about:history';

const { DatabaseFactory } = require("indexed-db-storage");

var idb = null,
    dbName = "history-meta",
    storeName = "history-meta";

DatabaseFactory.open(dbName).then(function (db) {
  db.createObjectStore(storeName, { keyPath : "url" }).then(function (store) {
    idb = store;
  });
});

// const global = this;
// Cu.import("resource://gre/modules/XPCOMUtils.jsm", global);

const about = require('pathfinder/scheme/about');
about.add({
  what: 'history',
  url: historyDataUrl
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

  search([options], {count: 50, sort: "dateAdded"}).on("end", function (results) {
    results = results.map(function (r) {
      return normalize(r);
      // filter out NULL history items because redirectsMode isn't working
    }).filter(function (item) { return item.title !== null });
    deferred.resolve(results);
  });
  return deferred.promise;
}

require("sdk/page-mod").PageMod({
  include: aboutHistory,
  contentScriptFile: [ data.url("js/jquery.min.js"),
                       data.url("js/moment-with-langs.min.js"),
                       data.url("js/underscore-min.js"),
                       data.url("js/backbone-min.js"),
                       data.url("history-pagemod.js")],
  attachTo: ["existing", "top"],
  onAttach: function(worker) {
    // var historyObserver = {
    //   onVisit: function(aURI, aVisitID, aTime, aSessionID, aReferringID, aTransitionType) {
    //     history({ url : aURI }).then(function (items) { EMIT(items.first) });
    //     worker.port.emit("history:add", aURI, aVisitID, aTime, aSessionID, aReferringID, aTransitionType);
    //   },
    //   QueryInterface: XPCOMUtils.generateQI([Ci.nsINavHistoryObserver])
    // };
    // historyService.addObserver(historyObserver, false);

    worker.port.on("history:events:click", function (href) {
      tabs.open(href);
    });

    history().then(function(r) {
      worker.port.emit("history:reset", r);
      r.forEach(function (item) {
        var url = item.url;
        getFavicon(url).then(function (icon_url) {
          worker.port.emit("icon:set", { url : url, icon_url: icon_url });
          return icon_url;
        });

        if (idb) {
          idb.get(url).then(function (metas) {
            if (metas) {
              worker.port.emit("url:meta", metas);
            }
          });
        }

      });
    });

    // worker.on('detach', function () {
    //   historyService.removeObserver(historyObserver);
    // });
  }
});



require("sdk/page-mod").PageMod({
  include: "*",
  contentScriptFile: [ data.url("cards-pagemod.js") ],
  attachTo: ["existing", "top"],
  onAttach: function(worker) {
    worker.port.on("metas", function(metas) {
       if (Object.keys(metas).length !== 0) {
        metas["url"] = worker.tab.url;
        if (idb) {
          idb.add(metas);
        }
      }
    });
  }
});

tabs.open('about:history');
