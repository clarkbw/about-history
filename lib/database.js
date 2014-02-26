"use strict";

const { DatabaseFactory } = require("indexed-db-storage");
const { resolve } = require('sdk/core/promise');

var idb = null;
const dbName = "history-meta";
const storeName = "history-meta";

DatabaseFactory.open(dbName).then(db => {
  db.createObjectStore(storeName, { keyPath : "url" }).then(store => {
    idb = store;
  });
});

function get(url) {
  return (idb) ? idb.get(url) : resolve({});
}
exports.get = get;

function add(data) {
  if (idb) {
    idb.add(metas);
  }
}
exports.add = add;
