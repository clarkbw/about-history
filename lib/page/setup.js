/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
'use strict';

const { data } = require('sdk/self');
const { getFavicon } = require("sdk/places/favicon");

const about = require('pathfinder/scheme/about');

const page = require('./events');
const database = require('../metadata/database');
const { history, remove } = require('../history');
const { hasBookmark } = require('../bookmarks');
const { Bookmarks } = require('../bookmarks/service');
const { History } = require('../history/service');
const { on } = require("sdk/event/core");
const moment = require('../utils/moment');

// create about:history url handler
about.add({
  what: 'history',
  url: data.url('history.html'),
  content: data.load('history.html')
});

on(Bookmarks, 'bookmark:added', data => {
  page.emit('url:bookmark', data);
});

on(Bookmarks, 'bookmark:removed', data => {
  page.emit('bookmark:removed', data);
});

on(History, 'delete', data => {
  page.emit('history:removed', data);
});

page.on("history:events:delete", ({ message: url }) => {
  // remove actual history
  remove(url);
});

page.on("history:events:delete-related", ({ message: url }) => {
  remove(url);
})

page.on("history:events:query", ({message, worker }) => {
  let start, end;

  if (message.date) {
    start = moment(message.date).startOf('day');
    end = moment(message.date).endOf('day');
  }

  history({
    query: message.query,
    from: message.from || start,
    to: message.to || end,
  }).then(results => reset(worker, results));
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
