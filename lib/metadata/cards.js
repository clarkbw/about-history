"use strict";

const { PageMod } = require("sdk/page-mod");
const { data } = require('sdk/self');

const database = require('./database');

PageMod({
  include: "*",
  contentScriptWhen: 'end',
  contentScriptFile: data.url("cards-pagemod.js"),
  attachTo: ["existing", "top"],
  onAttach: function(worker) {
    worker.port.on("metas", metas => database.add(metas));
  }
});
