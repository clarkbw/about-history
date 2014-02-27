
setTimeout(function () {

  var metas = {};

  let selector = "meta[property^=twitter],meta[name^=twitter],meta[property^=og],meta[name^=og]";
  let nodes = document.querySelectorAll(selector);

  for (let i = 0, l = nodes.length; i < l; i++) {
    ["name", "property"].forEach(key => {
      if (nodes[i].hasAttribute(key)) {
        ["value", "content"].forEach(value => {
          if (nodes[i].hasAttribute(value)) {
            metas[nodes[i].getAttribute(key)] = nodes[i].getAttribute(value);
          }
        });
      }
    });
  }

  // <link rel="canonical" href="http://www.cbc.ca/news/world/vladimir-putin-s-ukraine-dilemma-how-to-react-1.2549953" />
  // <link rel="image_src" href="http://i.cbc.ca/1.2550391.1393332876!/fileImage/httpImage/image.jpg_gen/derivatives/16x9_460/russia.jpg" />
  if (Object.keys(metas).length) {
    metas['url'] = document.location.href;
    self.port.emit("metas", metas);
  }

}, 200);
