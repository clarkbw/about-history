/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
 'use strict'

const { Cc, Ci, Cu } = require('chrome');
const hsrv = Cc['@mozilla.org/browser/nav-history-service;1'].
              getService(Ci.nsINavHistoryService);

const global = this;
Cu.import("resource://gre/modules/XPCOMUtils.jsm", global);

const { EventTarget } = require("sdk/event/target");
const { emit } = require('sdk/event/core');
const { Class } = require('sdk/core/heritage');
const { when: unload } = require('sdk/system/unload');

var History;
var nsIHistory = Class({
  extends: EventTarget,
  initialize: function initialize() {
    var that = this;
    hsrv.addObserver(this, false);
    unload(function () {
      hsrv.removeObserver(that);
    });
  },
  type: 'nsINavHistoryService',
  QueryInterface: XPCOMUtils.generateQI([Ci.nsINavHistoryObserver]),
  onVisit: function (aURI, aVisitID, aTime, aSessionID, aReferringID, aTransitionType) {
    emit(History, "visit", { url : aURI.spec, time : Math.floor(aTime / 1000), title : hsrv.getPageTitle(aURI) });
  },
  onBeginUpdateBatch: function () {},
  onEndUpdateBatch: function () {},
  onTitleChanged: function (aURI, aPageTitle) {
    emit(History, "title:changed", { url : aURI.spec, title : aPageTitle });
  },
  onBeforeDeleteURI: function (aURI) {},
  onDeleteURI: function (aURI) {
    emit(History, "delete", { url : aURI.spec });
  },
  onClearHistory: function () {
    emit(History, "clear");
  },
  onPageChanged: function (aURI, aWhat, aValue) {},
  onDeleteVisits: function () {},
});

History = nsIHistory();

exports.History = History;
