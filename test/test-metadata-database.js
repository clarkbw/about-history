"use strict";

const database = require('about-history/metadata/database');

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
