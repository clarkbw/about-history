/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

const { PageMod } = require("sdk/page-mod");
const { data } = require('sdk/self');

const database = require('./database');

PageMod({
  include: "*",
  contentScriptWhen: 'end',
  contentScriptFile: data.url("metadata-pagemod.js"),
  attachTo: ["existing", "top"],
  onAttach: function(worker) {
    worker.port.on("metas", metas => {
      if (Object.keys(metas).length > 1)
        database.add(metas);
      worker.destroy();
    });
  }
});
