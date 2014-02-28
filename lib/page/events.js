/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
'use strict';

const { PageMod } = require('sdk/page-mod');
const { data } = require('sdk/self');
const { getFavicon } = require("sdk/places/favicon");
const { on, emit } = require("sdk/event/core");

const target = Object.create(null);

// hack for bug 978202
const EVENTS = [
  "history:date",
  "history:events:click",
  "history:events:query",
  "history:events:delete",
]

// setup a page-mod to pipe information for about:history
PageMod({
  include: 'about:history',
  contentScriptFile: data.url("history-pagemod.js"),
  attachTo: ["existing", "top"],
  contentScriptWhen: "start",
  onAttach: worker => {
    EVENTS.forEach(event => {
      worker.port.on(event, msg => {
        msg = {
          worker: worker,
          message: msg
        };
        emit(target, event, msg);
      });
    })
  }
});

exports.on = (type, listener) => on(target, type, listener);
exports.off = (type, listener) => off(target, type, listener);
