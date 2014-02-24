
setTimeout(function () {

  var metas = {};

  // official twitter cards
  var cards = document.querySelectorAll("meta[property^=twitter]");
  for (var i = 0; i < cards.length; i++) {
    metas[cards[i].getAttribute("property")] = cards[i].getAttribute("content");
  }

  // nyt twitter cards
  var cards = document.querySelectorAll("meta[name^=twitter]");
  for (var i = 0; i < cards.length; i++) {
    metas[cards[i].getAttribute("name")] = cards[i].getAttribute("value");
  }

  var ographs = document.querySelectorAll("meta[property^=og]")
  for (var i = 0; i < ographs.length; i++) {
    metas[ographs[i].getAttribute("property")] = ographs[i].getAttribute("content");
  }

  self.port.emit("metas", metas);

}, 1000);
