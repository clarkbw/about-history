/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
"use strict";

let metas = {};

setTimeout(_ => {
  getTwitterInfo();
  getIcons();
  setTimeout(_ => {
    if (Object.keys(metas).length > 0) {
      metas['url'] = document.location.href;
      self.port.emit("metas", metas);
    }
    self.port.emit("destroy");
  });
}, 200);

function getTwitterInfo() {
  setTimeout(_ => {
    let nodes = document.querySelectorAll("meta[property^=twitter],meta[name^=twitter],meta[property^=og],meta[name^=og]");
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
  });
};

function getIcons() {
  setTimeout(_ => {
    let node = document.querySelector("head > link[rel='fluid-icon']");
    if (node) {
      metas['icon:fluid-icon'] = node.getAttribute('href');
    }
    node = document.querySelector("link[rel='image_src']");
    if (node) {
      metas['image_src'] = node.getAttribute('href');
    }
    if (document.contentType.startsWith("image/")) {
      let pathname = document.location.pathname;
      // for very large images this could be a real problem...
      metas['image_src'] = document.location.href;
      // only use the file name for the image
      metas['title'] = pathname.substring(pathname.lastIndexOf("/") + 1, pathname.length);
    }
  });
};
