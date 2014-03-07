/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

const { DatabaseFactory } = require("indexed-db-storage");
const { resolve } = require('sdk/core/promise');
const { emit } = require('sdk/event/core');

const { History } = require('../history/service');
const { Metadata } = require('./events');

const dbName = "history-meta";
const storeName = "history-meta";

const idbPromise = DatabaseFactory.open(dbName).then(db => {
  return db.createObjectStore(storeName, { keyPath : "url" }).then(store => {
    return store;
  });
});

function remove(url) {
  idbPromise.then(idb => idb.remove(url));
}
exports.remove = remove;

function get(url) {
  return idbPromise.then(idb => idb.get(url));
}
exports.get = get;

function add(metas) {
  return idbPromise.then(idb => idb.remove(metas.url)).
  then(_ => idbPromise).
  then(idb => idb.add(metas)).
  then(_ => {
    emit(Metadata, "add", metas);
  }, err => {
    console.log(err)
  });
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
