"use strict";

const { defer } = require('sdk/core/promise');
const { search } = require('sdk/places/bookmarks');

function hasBookmark(url) {
  let deferred = defer();
  search({ url: url }).on('end', results => {
    let found = results.find(result => result.url == url);
    deferred.resolve(!!found);
  });
  return deferred.promise;
}
exports.hasBookmark = hasBookmark;


