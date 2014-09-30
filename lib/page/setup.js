/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
'use strict';

const { data } = require('sdk/self');
const { getFavicon } = require("sdk/places/favicon");
const tabs = require('sdk/tabs');

const about = require('addon-pathfinder/scheme/about');

const page = require('./events');
const database = require('../metadata/database');
const { history, remove, removeDomain } = require('../history');
const { hasBookmark } = require('../bookmarks/utils');
const { events } = require('../history/service');
const { Metadata } = require('../metadata/events');
const { on } = require("sdk/event/core");

// create about:history url handler
about.add({
  what: 'history',
  url: 'chrome://about-history/content/history.html'
});

on(events, 'bookmark:added', data => {
  page.emit('url:bookmark', data);
});

on(events, 'bookmark:removed', data => {
  page.emit('bookmark:removed', data);
});

on(events, 'delete', data => {
  page.emit('history:removed', data);
});

on(events, 'visit', data => {
  page.emit('history:add', data);
});

on(events, 'title:changed', data => {
  // history will check for dupes
  page.emit('history:add', data);
});

on(Metadata, 'add', metas => {
  page.emit('url:meta', metas)
});

page.on('open', ({ message: url }) => {
  tabs.open({
    url: url,
    inBackground: true
  });
});

page.on("history:events:delete", ({ message: url }) => {
  // remove actual history
  remove(url);
});

page.on("history:events:delete-related", ({ message: url }) => {
  removeDomain(url);
})

page.on("history:events:query", ({ message, worker }) => {
  history(message).then(results => reset(worker, results));
});

function reset(worker, results) {
  worker.port.emit("history:reset", results);

  results.forEach(({ url }) => {
    getFavicon(url).then(icon_url => {
      worker.port.emit("url:icon", {
        url: url,
        icon_url: icon_url
      });
    });

    database.get(url).then(metas => {
      if (metas) {
        worker.port.emit("url:meta", metas);
      }
    });

    hasBookmark(url).then(bookmarked => {
      if (bookmarked) {
        worker.port.emit('url:bookmark', { url: url });
      }
    });
  });
}
