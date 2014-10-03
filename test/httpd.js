/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

const { Loader } = require('sdk/test/loader');
const loader = Loader(module);
const { startServerAsync } = loader.require('addon-httpd');
const { pathFor } = require('sdk/system');
const file = require('sdk/io/file');

const basePath = pathFor("ProfD");
const port = 8099;
const host = 'http://localhost:' + port + '/';

function serve({ name, content }) {
  content = content || '<html><head><title>'+name+'</title></head><body></body></html>';
  let srv = startServerAsync(port, basePath);
  let pagePath = file.join(basePath, name + '.html');
  let pageStream = file.open(pagePath, 'w');
  pageStream.write(content);
  pageStream.close();
  return srv;
}
exports.serve = serve;
exports.host = host;
