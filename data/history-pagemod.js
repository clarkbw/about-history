
self.port.on("history", function(items) {
  var history = $("#history-items"),
      item;
  if (items) {
    for (var i = 0; i < items.length; i++) {
      item = items[i];
      console.log(item);
      $("<div class='history-item'/>").append(
          $("<img/>").attr({ src : item.icon.replace("moz-anno:favicon:", "") }),
          $("<div/>").text(item.title),
          $("<div/>").text(moment(item.time).fromNow()),
          $("<a/>").attr({ href : item.uri }).text(item.title)
      ).appendTo(history);
    }
  }
});
