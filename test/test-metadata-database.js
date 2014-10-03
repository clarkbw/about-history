/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

const database = require('../lib/metadata/database');

exports["test metadata database"] = function(assert, done) {
  let testURL = "http://localhost:9000";
  database.add({
    url: testURL,
    test: 'foo'
  }).
  then(_ => {
    assert.pass('data was added');
    return database.get(testURL)
  }).
  then(({ test }) => {
    assert.equal(test, 'foo', 'the metadata was stored')
  }).
  then(_ => database.remove(testURL)).
  then(_ => database.get(testURL)).
  then(metas => {
    assert.equal(metas, undefined, 'no metadata');
  }).
  then(done).
  then(null, assert.fail);
}

require("sdk/test").run(exports);
