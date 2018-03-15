"use strict";

class UtilityBelt {

  constructor() {
    this.__supportsAddEventListener = !!document.addEventListener;
    this.__supportsAttachEvent = !!document.attachEvent;

    const supportsClassList = () => {
      const div = document.createElement("div");
      return !!div.classList;
    };
    this.__supportsClassList = supportsClassList();

    this.__supportsGetElementsByClassName = !!document.getElementsByClassName;
    this.__supportsQuerySelectorAll = !!document.querySelectorAll;
  }

  findClassName(className) {
    return new RegExp("(^|\\s)" + className + "(\\s|$)", "i");
  }

  hasClassName = (className, element) => {
    if (this.__supportsClassList) {
      return element.classList.contains(className);
    }

    const findClassName = this.findClassName(className);
    return element.className && findClassName.test(element.className);
  }

  addClassName = (className, element) => {
    if (this.__supportsClassList) {
      element.classList.add(className);
    } else {
      element.className += ` ${className}`;
    }
  }

  removeClassName = (className, element) => {
    if (this.__supportsClassList) {
      element.classList.remove(className);
    } else {
      const removeClass = this.findClassName(className);
      element.className = element.className.replace(removeClass, "$1$2");
    }
  }

  getElementsByClassName = (className, element = document) => {
    // Faster than element.querySelectorAll()
    if (this.__supportsGetElementsByClassName) {
      return element.getElementsByClassName(className);
    }

    // Waaaaay faster than the last resort
    if (this.__supportsQuerySelectorAll) {
      return element.querySelectorAll(`.${className}`);
    }

    const descendantsWithClass = [];
    element.getElementsByTagName("*").forEach((node) => {
      if (this.hasClass(className, node)) {
        descendantsWithClass.push(node);
      }
    });

    return descendantsWithClass;
  }

  /**
   * Wrap addEventListener and the old IE approach to save some redundancy.
   * Note that `this` is different in an event fired in IE's elem.attachEvent --
   * maybe @see
   * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/attachEvent --
   * so be careful if you need to support really old browsers.
   */
  addEventListener = (eventTarget, event, callback, capture) => {
    if (this.__supportsAddEventListener) {
      eventTarget.addEventListener(event, callback, !!capture);
    } else if (this.__supportsAttachEvent) {
      eventTarget.attachEvent(`on${event}`, callback);
    } else {
      console && console.warn('`newEventListener(...)` is unsupported.');
    }
  }

  onDOMReady = (callback) => {
    const DOM_LOADED = "DOMContentLoaded";
    const ON_READY = "onreadystatechange";

    if (this.__supportsAddEventListener) {
      document.addEventListener(DOM_LOADED, () => {
        document.removeEventListener(DOM_LOADED, arguments.callee, false);
        callback();
      });
    } else if (this.__supportsAttachEvent) {
      document.attachEvent(ON_READY, () => {
        if (document.readyState === "complete") {
          document.detachEvent(ON_READY, arguments.callee);
          callback();
        }
      });
    } else {
      console && console.warn('`onDOMReady(...)` is unsupported.');
    }
  }
}

export default UtilityBelt;
