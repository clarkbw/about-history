
setTimeout(function () {

  var metas = {};
  var selector;
  var nodes;

  selector = "meta[property^=twitter],meta[name^=twitter],meta[property^=og],meta[name^=og]";
  nodes = document.querySelectorAll(selector);
  for (var i = 0; i < nodes.length; i++) {
    ["name", "property"].forEach(function (key) {
      if (nodes[i].hasAttribute(key)) {
        ["value", "content"].forEach(function (value) {
          if (nodes[i].hasAttribute(value)) {
            metas[nodes[i].getAttribute(key)] = nodes[i].getAttribute(value);
          }
        });
      }
    });
  }

  console.log(metas);
  // <link rel="canonical" href="http://www.cbc.ca/news/world/vladimir-putin-s-ukraine-dilemma-how-to-react-1.2549953" />
  // <link rel="image_src" href="http://i.cbc.ca/1.2550391.1393332876!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_460/russia.jpg" /> 
  self.port.emit("metas", metas);

}, 1000);
