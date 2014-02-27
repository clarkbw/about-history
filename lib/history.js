'use strict';

const { URL } = require('sdk/url');
const { defer } = require('sdk/core/promise');
const { search } = require('sdk/places/history');
const { merge } = require("sdk/util/object");
const moment = require('./utils/moment');
const DATE = moment().startOf('day');

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
      from: DATE.valueOf()
    }, options);
  }

  search([options], {count: 50, sort: "dateAdded", descending: true}).on("end", function (results) {
    results = results.map(function (r) {
      return normalize(r);
      // filter out NULL history items because redirectsMode isn't working
    }).filter(function (item) { return item.title !== null });
    deferred.resolve(results);
  });
  return deferred.promise;
}
exports.history = history;
