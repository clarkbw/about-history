/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

const tabs = require('sdk/tabs');
const { on, once } = require('sdk/event/core');
const { setTimeout } = require('sdk/timers');
const { Bookmark, search, save, remove } = require("sdk/places/bookmarks");

const { history } = require('../lib/history');
const { events } = require('../lib/history/service');

const { serve, host } = require('./httpd');

function makeURL(title) encodeURI('data:text/html;charset=utf-8,' + title)

exports["test history"] = function(assert, done) {
  let title = 'testHistory1';
  let url = host + title + '.html';
  let srv = serve({ name: title });
  let tab;

  events.once('visit', data => {
    assert.pass('visit event happened');
    setTimeout(_ => {
      history().then(results => {
        assert.ok(results.length, 'there are results')
        assert.ok(results.find(result => result.url == url), url + ' was found');
        srv.stop(_ => tab.close(done));
      })
    })
  });

  tabs.open({
    url: url,
    onOpen: t => tab = t
  })
}

exports["test bookmark"] = function(assert, done) {
  let title = 'testBookmark1';
  let url = host + title + '.html';
  let srv = serve({ name: title });
  let tab;

  events.once('bookmark:added', ({url: bookmark}) => {
    assert.pass('bookmark event happened');
    assert.equal(url, bookmark,  url + ' was added as the bookmark');
  });

  events.once('bookmark:removed', ({url: bookmark}) => {
    assert.pass('bookmark event happened');
    assert.equal(url, bookmark, url + ' was removed as the bookmark');
    srv.stop(_ => tab.close(done));
  });

  tabs.open({
    url: url,
    onOpen: function (t) {
      tab = t;
      save(Bookmark({ title: title, url: url })).on('end', saves => {
        save(remove(saves));
      });
    }
  })
}

require("sdk/test").run(exports);
