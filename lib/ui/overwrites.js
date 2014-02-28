"use strict";

const { WindowTracker } = require("sdk/deprecated/window-utils");
const { isBrowser } = require("sdk/window/utils");
const tabs = require("sdk/tabs");
const ABOUT_HISTORY = 'about:history';

const oldPlacesOrganizer = new WeakMap();

function openAboutHistory() {
  var found = null;
  for each (var tab in tabs) {
    if (tab.url === ABOUT_HISTORY) {
      found = tab;
      found.activate();
      break;
    }
  }
  if (found === null) {
    tabs.open(ABOUT_HISTORY);
  }
}

WindowTracker({
  onTrack: window => {
    if (!isBrowser(window)) return;
    let { PlacesCommandHook } = window;
    let old = PlacesCommandHook.showPlacesOrganizer;
    oldPlacesOrganizer.set(window, old);
    PlacesCommandHook.showPlacesOrganizer = openAboutHistory;
  },
  onUntrack: window => {
    let old = oldPlacesOrganizer.get(window);
    if (!old) return;
    window.PlacesCommandHook.showPlacesOrganizer = old;
  }
});
