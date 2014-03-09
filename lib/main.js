/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

const tabs = require("sdk/tabs");
const { when: unload } = require('sdk/system/unload');
const { close } = require('./page/actions');
const { loadReason } = require('sdk/self');

// start collecting metadata
require('./metadata/setup');

// setup about:history
require('./page/setup');

// implement ui hacks
require('./ui/overwrites');

if (loadReason == 'install') {
  tabs.open('about:history');
}

// Closing all about:history tabs on uninstall/disable
unload(reason => {
  if (reason == 'disable' || reason == 'uninstall') {
    close();
  }
});
