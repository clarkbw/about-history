/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

const tabs = require('sdk/tabs');
const { on, once } = require('sdk/event/core');
const { setTimeout } = require('sdk/timers');

const { history } = require('about-history/history');
const { events } = require('about-history/history/service');

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

require("sdk/test").run(exports);
