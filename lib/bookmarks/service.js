/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
'use strict'

const { Ci, Cc, Cu } = require('chrome');

const { XPCOMUtils } = Cu.import("resource://gre/modules/XPCOMUtils.jsm", {});

const { EventTarget } = require("sdk/event/target");
const { emit } = require('sdk/event/core');
const { Class } = require('sdk/core/heritage');
const { when: unload } = require('sdk/system/unload');

const bookmarksService = Cc["@mozilla.org/browser/nav-bookmarks-service;1"].
                           getService(Ci.nsINavBookmarksService);

const nsIBookmarks = Class({
  extends: EventTarget,
  initialize: function initialize() {
    bookmarksService.addObserver(this, false);
    unload(_ => bookmarksService.removeObserver(this));
  },
  onBeginUpdateBatch: function() {},
  onEndUpdateBatch: function() {},
  onItemAdded: function(aItemId, aFolder, aIndex, aItemType, aURI) {
    emit(this, "bookmark:added", {
      url : aURI.spec
    });
  },
  onItemRemoved: function(aItemId, aFolder, aIndex, aItemType, aURI) {
    emit(this, "bookmark:removed", {
      url: aURI.spec
    });
  },
  onItemChanged: function(aBookmarkId, aProperty, aIsAnnotationProperty, aValue) {
    //
  },
  onItemVisited: function(aBookmarkId, aVisitID, time) {
    //
  },
  onItemMoved: function(aItemId, aOldParent, aOldIndex, aNewParent, aNewIndex) {
    //
  },
  QueryInterface: XPCOMUtils.generateQI([Ci.nsINavBookmarkObserver])
});
exports.Bookmarks = nsIBookmarks();
