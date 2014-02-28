/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
'use strict';

const tabs = require('sdk/tabs');
const { data } = require('sdk/self');

const about = require('pathfinder/scheme/about');

const { on, off } = require('./events');
const database = require('../metadata/database');
const { history, remove } = require('../history');
const { hasBookmark } = require('../bookmarks');
const moment = require('../utils/moment');

// create about:history url handler
about.add({
  what: 'history',
  url: data.url('history.html'),
  content: data.load('history.html')
});

on("history:events:click", ({ message: url }) => {
  tabs.open(url);
});

on("history:events:delete", ({ message: url }) => {
  // remove actual history
  remove(url);
});

// send the working date
on("history:date", ({ message: date, worker }) => {
  var start = moment(date).startOf('day'),
      end = moment(date).endOf('day');
  history({ from: start, to : end }).then(results => reset(worker, results));
});

on("history:events:query", ({message: query, worker }) => {
  history({ query: query }).then(results => reset(worker, results));
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
