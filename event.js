function EventEmitter() {
  this.events = new Map();
}

// 需要实现的一些方法：
// addListener、removeListener、once、removeAllListeners、emit

// 模拟实现addlistener方法
const wrapCallback = (fn, once = false) => ({ callback: fn, once });
EventEmitter.prototype.addListener = function (type, fn, once = false) {
  const handler = this.events.get(type);
  if (!handler) {
    // 没有type绑定事件
    this.events.set(type, wrapCallback(fn, once));
  } else if (handler && typeof handler.callback === "function") {
    // 目前type事件只有一个回调
    this.events.set(type, [handler, wrapCallback(fn, once)]);
  } else {
    // 目前type事件数>=2
    handler.push(wrapCallback(fn, once));
  }
};

// 模拟实现on方法
EventEmitter.prototype.on = EventEmitter.prototype.addListener

// 模拟实现removeListener
EventEmitter.prototype.removeListener = function (type, listener) {
  const handler = this.events.get(type);
  if (!handler) return;
  if (!Array.isArray(handler)) {
    if (handler.callback === listener.callback) this.events.delete(type);
    else return;
  }
  for (let i = 0; i < handler.length; i++) {
    const item = handler[i];
    if (item.callback === listener.callback) {
      handler.splice(i, 1);
      i--;
      if (handler.length === 1) {
        this.events.set(type, handler[0]);
      }
    }
  }
};

// 模拟实现once方法
EventEmitter.prototype.once = function (type, listener) {
  this.addListener(type, listener, true);
};

// 模拟实现emit方法
EventEmitter.prototype.emit = function (type, ...args) {
  const handler = this.events.get(type);
  if (!handler) return;
  if (Array.isArray(handler)) {
    handler.forEach((item) => {
      item.callback.apply(this, args);
      if (item.once) {
        this.removeListener(type, item);
      }
    });
  } else {
    handler.callback.apply(this, args);
    if (handler.once) {
      this.events.delete(type);
    }
  }
  return true;
};

EventEmitter.prototype.removeAllListeners = function (type) {
  const handler = this.events.get(type);
  if (!handler) return;
  this.events.delete(type);
};

// test
let eventEmitter = new EventEmitter();

eventEmitter.once("say", function (str) {
  console.log(str);
});
eventEmitter.emit("say", "hello Jony yu");
eventEmitter.emit("say", "hello Jony yu2");
