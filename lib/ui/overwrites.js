"use strict";

const { WindowTracker } = require("sdk/deprecated/window-utils");
const { isBrowser } = require("sdk/window/utils");
const tabs = require("sdk/tabs");
const windows = require("sdk/windows").browserWindows;
const ABOUT_HISTORY = 'about:history';

const oldPlacesOrganizer = new WeakMap();

function reuseAboutHistory() {
  // check active window
  for each (var tab in windows.activeWindow.tabs) {
    if (tab.url === ABOUT_HISTORY) {
      tab.activate();
      return;
    }
  }

  // check all tabs
  for each (var tab in tabs) {
    if (tab.url === ABOUT_HISTORY) {
      tab.activate();
      return;
    }
  }

  tabs.open(ABOUT_HISTORY);
  return;
}

WindowTracker({
  onTrack: window => {
    if (!isBrowser(window)) return;
    let { PlacesCommandHook } = window;
    let old = PlacesCommandHook.showPlacesOrganizer;
    oldPlacesOrganizer.set(window, old);
    PlacesCommandHook.showPlacesOrganizer = reuseAboutHistory;
  },
  onUntrack: window => {
    let old = oldPlacesOrganizer.get(window);
    if (!old) return;
    window.PlacesCommandHook.showPlacesOrganizer = old;
  }
});
