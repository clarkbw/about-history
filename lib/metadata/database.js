"use strict";

const { DatabaseFactory } = require("indexed-db-storage");
const { resolve } = require('sdk/core/promise');

const { History } = require('../history/service');

const dbName = "history-meta";
const storeName = "history-meta";

const idbPromise = DatabaseFactory.open(dbName).then(db => {
  return db.createObjectStore(storeName, { keyPath : "url" }).then(store => {
    return store;
  });
});

function remove(url) {
  return idbPromise.then(idb => idb.remove(url));
}
exports.remove = remove;

function get(url) {
  return idbPromise.then(idb => idb.get(url));
}
exports.get = get;

function add(metas) {
  return idbPromise.then(idb => idb.add(metas));
}
exports.add = add;

// remove a single history item via the URL
History.on("delete", (url) => remove(url));

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
