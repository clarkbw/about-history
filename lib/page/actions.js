"use strict";

const tabs = require("sdk/tabs");

const ABOUT_HISTORY = 'about:history';

function close() {
  // check all tabs
  for each (let tab in tabs) {
    if (tab.url === ABOUT_HISTORY) {
      tab.close();
    }
  }
}
exports.close = close;
