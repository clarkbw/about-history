/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
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


