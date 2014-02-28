"use strict";

const tabs = require("sdk/tabs");
const { when: unload } = require('sdk/system/unload');
const { close } = require('./page/actions');

// start collecting metadata
require('./metadata/cards');

// setup about:history
require('./page');

// implement ui hacks
require('./ui/overwrites');

tabs.open('about:history');

// Closing all about:history tabs on uninstall/disable
unload(reason => {
  if (reason == 'disable' || reason == 'uninstall') {
    close();
  }
});
