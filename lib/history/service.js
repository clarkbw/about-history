/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
'use strict'

const { Ci, Cu } = require('chrome');

const { PlacesUtils: { history } } = Cu.import("resource://gre/modules/PlacesUtils.jsm", {})
const { XPCOMUtils } = Cu.import("resource://gre/modules/XPCOMUtils.jsm", {})

const { EventTarget } = require("sdk/event/target");
const { emit } = require('sdk/event/core');
const { Class } = require('sdk/core/heritage');
const { when: unload } = require('sdk/system/unload');

const nsIHistory = Class({
  extends: EventTarget,
  initialize: function initialize() {
    history.addObserver(this, false);
    unload(_ => history.removeObserver(this));
  },
  type: 'nsINavHistoryService',
  QueryInterface: XPCOMUtils.generateQI([
    Ci.nsINavHistoryObserver
  ]),
  onVisit: function (aURI, aVisitID, aTime, aSessionID, aReferringID, aTransitionType) {
    // ignore redirects
    if (aTransitionType === history.TRANSITION_REDIRECT_TEMPORARY || history.TRANSITION_REDIRECT_PERMANENT) {
      return;
    }
    emit(this, "visit", { url : aURI.spec, time : Math.floor(aTime / 1000), title : history.getPageTitle(aURI) || "" });
  },
  onBeginUpdateBatch: function () {},
  onEndUpdateBatch: function () {},
  onTitleChanged: function (aURI, aPageTitle) {
    emit(this, "title:changed", { url : aURI.spec, title : aPageTitle });
  },
  onBeforeDeleteURI: function (aURI) {},
  onDeleteURI: function (aURI) {
    emit(this, "delete", { url : aURI.spec });
  },
  onClearHistory: function () {
    emit(this, "clear");
  },
  onPageChanged: function (aURI, aWhat, aValue) {},
  onDeleteVisits: function () {},
  onStopped: _ => {}
});
exports.History = nsIHistory();
