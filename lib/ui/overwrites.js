"use strict";

const { WindowTracker } = require("sdk/deprecated/window-utils");
const tabs = require("sdk/tabs");

const oldPlacesOrganizer = new WeakMap();

function openAboutHistory() {
  tabs.open({
    url: 'about:history'
  });
}

WindowTracker({
  onTrack: window => {
    let { PlacesCommandHook } = window;
    let old = PlacesCommandHook.showPlacesOrganizer;
    oldPlacesOrganizer.set(window, old);
    PlacesCommandHook.showPlacesOrganizer = openAboutHistory;
  },
  onUntrack: window => {
    let old = oldPlacesOrganizer.get(window);
    window.PlacesCommandHook.showPlacesOrganizer = old;
  }
});
