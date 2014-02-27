"use strict";

const tabs = require("sdk/tabs");

// start collecting metadata
require('./metadata/cards');

require('./page');
require('./service/history');

function openAboutHistory() {
  var found = null;
  for each (var tab in tabs) {
    if (tab.url === aboutHistory) {
      found = tab;
      found.activate();
      break;
    }
  }
  if (found === null) {
    tabs.open(aboutHistory);
  }
}

tabs.open('about:history');
require('./ui/overwrites');
