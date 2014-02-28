"use strict";

const tabs = require('sdk/tabs');
const { on, once } = require('sdk/event/core');
const { setTimeout } = require('sdk/timers');

const { history } = require('about-history/history');
const { History } = require('about-history/history/service');

const { serve, host } = require('./httpd');

function makeURL(title) encodeURI('data:text/html;charset=utf-8,' + title)

exports["test history"] = function(assert, done) {
  let title = 'testHistory1';
  let url = host + title + '.html';
  let srv = serve({ name: title });
  let tab;

  History.once('visit', data => {
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
