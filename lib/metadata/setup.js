/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
'use strict';

var tabs = require('sdk/tabs');
var wutils = require('sdk/window/utils');
var tutils =  require('sdk/tabs/utils');

const database = require('./database');

function getMetaData(tab) {
  var window = wutils.getMostRecentBrowserWindow();
  var tabbrowser = tutils.getTabBrowser(window);
  var messageManager = tabbrowser.selectedBrowser.messageManager;

  console.log('tab', tab.url);

  messageManager.addMessageListener('PageMetadata:PageDataResult', function _dataFn({json:msg}) {
    messageManager.removeMessageListener('PageMetadata:PageDataResult', _dataFn);
    console.log('meta');
    console.dir(msg);
    database.add(msg);
  });

  messageManager.sendAsyncMessage('PageMetadata:GetPageData');
}

tabs.on('open', getMetaData);
tabs.on('activate', getMetaData);
tabs.on('ready', getMetaData);
