const { Cc, Ci, Cu } = require('chrome');
const about = require('pathfinder/scheme/about');
const { data } = require('sdk/self');

const historyDataUrl = data.url('history.html');
const aboutHistory = 'about:history';

const global = this;
Cu.import("resource://gre/modules/XPCOMUtils.jsm", global);

about.add({
  what: 'history',
  url: historyDataUrl
});

var historyService = Cc["@mozilla.org/browser/nav-history-service;1"].getService(Ci.nsINavHistoryService);


function nsINavHistoryResultNodeToJSON(node) {
  // nsINavHistoryResultNode
  return { 
    accessCount :   node.accessCount,
    bookmarkIndex : node.bookmarkIndex,
    dateAdded :     node.dateAdded,
    icon :          node.icon,
    indentLevel :   node.indentLevel,
    itemId :        node.itemId,
    lastModified :  node.lastModified,
//    parent :        node.parent, {nsINavHistoryContainerResultNode}
//    parentResult :  node.parentResult, {nsINavHistoryResult}
    tags :          node.tags,
    time :          node.time / 1000,
    title :         node.title,
    uri :           node.uri
  };
}
// TODO: check in on nsINavHistoryVisitResultNode and nsINavHistoryFullVisitResultNode

function history() {
  let items = [];
  
  let options = historyService.getNewQueryOptions();
  
  // let query1 = historyService.getNewQuery();
  // query1.searchTerms = "mozilla";
  
  // second query object searches for visited in past 24 hours AND from mozilla.org
  let query2 = historyService.getNewQuery();
  query2.beginTimeReference = query2.TIME_RELATIVE_NOW;
  query2.beginTime = -24 * 60 * 60 * 1000000; // 24 hours ago in microseconds
  query2.endTimeReference = query2.TIME_RELATIVE_NOW;
  query2.endTime = 0; // now
  // query2.domain = "mozilla.org";
  
  let result = historyService.executeQueries([query2], 1, options);
  
  let cont = result.root;
  cont.containerOpen = true;
      
  for (let i = 0; i < cont.childCount; i ++) {
      let node = cont.getChild(i);
      // "node" attributes contains the information (e.g. URI, title, time, icon...)
      // see : https://developer.mozilla.org/en/nsINavHistoryResultNode
      console.log(node.title);
      items.push(nsINavHistoryResultNodeToJSON(node));
  }
  // Close container when done
  // see : https://developer.mozilla.org/en/nsINavHistoryContainerResultNode
  cont.containerOpen = false;
  return items;
}

require("sdk/page-mod").PageMod({
  include: aboutHistory,
  contentScriptFile: [data.url("js/jquery.js"), data.url("js/moment-with-langs.min.js"), data.url("history-pagemod.js")],
  onAttach: function(worker) {
    var historyObserver = {
      onVisit: function(aURI, aVisitID, aTime, aSessionID, aReferringID, aTransitionType) {
        worker.port.emit("history:add", aURI, aVisitID, aTime, aSessionID, aReferringID, aTransitionType);
      },
      QueryInterface: XPCOMUtils.generateQI([Ci.nsINavHistoryObserver])
    };
    historyService.addObserver(historyObserver, false);

    worker.port.emit("history", history());

    worker.on('detach', function () {
      historyService.removeObserver(historyObserver);
    });
  }
});

require("sdk/tabs").open('about:history');
