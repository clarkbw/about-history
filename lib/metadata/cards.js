"use strict";

const { PageMod } = require("sdk/page-mod");
const { data } = require('sdk/self');

const database = require('./database');

PageMod({
  include: "*",
  contentScriptFile: [ data.url("cards-pagemod.js") ],
  attachTo: ["existing", "top"],
  onAttach: function(worker) {
    worker.port.on("metas", function(metas) {
      if (!metas || !Object.keys(metas).length) {
        return;
      }

      metas["url"] = worker.tab.url;
      database.add(metas);
    });
  }
});
