/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

unsafeWindow.addon = {
  on: (type, listener) => {
    self.port.on(type, data => {
      listener(data);
    })
  },
  emit: (type, data) => {
    self.port.emit(type, data)
  }
};
