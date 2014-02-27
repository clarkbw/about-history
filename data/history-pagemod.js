"use strict";

unsafeWindow.addon = {
  on: (type, listener) => {
    self.port.on(type, data => {
      listener(data);
    })
  },
  emit: (type, data) => {
    self.port.emit(type, data)
  }
};


