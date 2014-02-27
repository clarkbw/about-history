"use strict";

const { DatabaseFactory } = require("indexed-db-storage");
const { resolve } = require('sdk/core/promise');

const { History } = require('../service/history');

var idb = null;
const dbName = "history-meta";
const storeName = "history-meta";

DatabaseFactory.open(dbName).then(db => {
  db.createObjectStore(storeName, { keyPath : "url" }).then(store => {
    idb = store;
  });
});

function remove(url) {
  return (!!idb) ? idb.remove(url) : resolve({});
}
exports.remove = remove;

function get(url) {
  return (!!idb) ? idb.get(url) : resolve({});
}
exports.get = get;

function add(metas) {
  if (idb) {
    idb.add(metas);
  }
}
exports.add = add;

// remove a single history item via the URL
History.on("delete", function (url) {
  remove(url);
});

// clear the entier history-meta databasse
History.on("clear", function () {
  if (idb) {
    idb.all().then(function (items) {
      items.forEach(function (item) {
        remove(item.url);
      });
    })
  }
});
