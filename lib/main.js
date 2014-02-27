"use strict";

// start collecting metadata
require('./metadata/cards');

require('./page');

require("sdk/tabs").open('about:history');
