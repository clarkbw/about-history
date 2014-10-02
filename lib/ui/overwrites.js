/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

const { WindowTracker } = require("sdk/deprecated/window-utils");
const { isBrowser, getMostRecentBrowserWindow } = require("sdk/window/utils");
const tabs = require("sdk/tabs");
const windows = require("sdk/windows").browserWindows;
const ABOUT_HISTORY = 'about:history';

const oldPlacesOrganizer = new WeakMap();

function openAboutHistory() {
  // check active window
  for each (let tab in windows.activeWindow.tabs) {
    if (tab.url === ABOUT_HISTORY) {
      tab.activate();
      return;
    }
  }

  // check all tabs
  for each (let tab in tabs) {
    if (tab.url === ABOUT_HISTORY) {
      tab.activate();
      return;
    }
  }

  tabs.open(ABOUT_HISTORY);
  return;
}
exports.openAboutHistory = openAboutHistory;

function showPlacesOrganizer(type) {
  type = type || "";
  if (type.toLowerCase() != "history") {
    return oldPlacesOrganizer.get(getMostRecentBrowserWindow())(type);
  }
  return openAboutHistory();
}

WindowTracker({
  onTrack: window => {
    if (!isBrowser(window)) return;
    let { PlacesCommandHook } = window;
    let old = PlacesCommandHook.showPlacesOrganizer;
    oldPlacesOrganizer.set(window, old);
    PlacesCommandHook.showPlacesOrganizer = showPlacesOrganizer;
  },
  onUntrack: window => {
    let old = oldPlacesOrganizer.get(window);
    if (!old) return;
    window.PlacesCommandHook.showPlacesOrganizer = old;
  }
});
