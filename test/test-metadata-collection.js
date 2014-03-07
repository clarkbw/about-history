/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

const tabs = require("sdk/tabs");
const { on, off } = require("sdk/event/core");

const { Metadata } = require("about-history/metadata/events");
require("about-history/metadata/setup");

const data = require("./fixtures");

exports.testMetadataCollection = function(assert, done) {
  const TEST_URL = data.url("metadata.html");
  tabs.open({
    url: TEST_URL,
    onOpen: tab => {
      assert.pass('tab was opened');
      on(Metadata, "add", function onMetaAdd(metas) {
        if (metas.url == TEST_URL) {
          assert.equal(metas["icon:fluid-icon"], 'test-fluid-icon', 'the fluid-icon data was collected');
          assert.equal(metas["twitter:site"], "@github", "the twitter:site info was collected");
          off(Metadata, "add", onMetaAdd);
          tab.close(done);
        }
      });
    }
  });
}

require("sdk/test").run(exports);
