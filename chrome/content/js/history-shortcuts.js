/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
'use strict';

document.body.addEventListener('keypress', ({ key, target }) => {
  if (target.id == 'query') return;
  if (key == 'Backspace') {
    doForSelected(item => {
      addon.emit("history:events:delete", item.get("url"));
    });
  }
})

function doForSelected(fn) {
  HistoryApp.historyList.forEach(item => {
    if (item.get('selected')) {
      fn(item);
    }
  });
}
