"use strict";

const tabs = require("sdk/tabs");

// start collecting metadata
require('./metadata/cards');

// setup about:history
require('./page');

// implement ui hacks
require('./ui/overwrites');

tabs.open('about:history');
