/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

var addon = createObjectIn(document.defaultView, { defineAs: "addon" });
var on = (type, listener) => {
  self.port.on(type, data => {
    listener(data);
  })
};
var emit = (type, data) => self.port.emit(type, data);

exportFunction(on, addon, { defineAs: "on", "allowCallbacks": true })
exportFunction(emit, addon, { defineAs: "emit" })
