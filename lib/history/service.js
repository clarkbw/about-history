/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
'use strict'

const { events } = require('sdk/places/events');
const { EventTarget } = require("sdk/event/target");
const { emit } = require('sdk/event/core');
const { URL } = require('sdk/url');

// https://developer.mozilla.org/en-US/docs/XPCOM_Interface_Reference/nsINavHistoryService#Transition_type_constants
const TRANSITION_REDIRECT_PERMANENT = 5;
const TRANSITION_REDIRECT_TEMPORARY = 6;

const emitter = EventTarget();

events.on('data', function ({type, data}) {
  switch (type) {

    case 'history-visit':
      if (data.transitionType === TRANSITION_REDIRECT_PERMANENT ||
          data.transitionType === TRANSITION_REDIRECT_TEMPORARY) {
        return;
      }
      var uri = URL(data.url);
      emit(emitter, "visit", {
        url : data.url,
        host: uri.host,
        scheme: uri.scheme,
        time : Math.floor(data.time / 1000)
      });
    break;

    case 'history-title-changed':
      var uri = URL(data.url);
      emit(emitter, "title:changed", {
        url : data.url,
        host: uri.host,
        scheme: uri.scheme,
        title : data.title
      });
    break;

    case 'history-delete-url':
      emit(emitter, "delete", { url : data.url });
    break;

    case 'history-start-clear':
      emit(emitter, "clear");
    break;

  }
});

exports.events = emitter;
