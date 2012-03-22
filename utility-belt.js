(function (root, doc) {
    "use strict";
    
    var Utility,
        _canGetElementsByClassName,
        _canQuerySelectorAll,
        _canUseClassList,
        _canAddEventListener,
        _canAttachEvent;
    
    _canGetElementsByClassName = !!doc.getElementsByClassName;
    _canQuerySelectorAll = !!doc.querySelectorAll;
    _canUseClassList = (function _canUseClassList() {
        var div = doc.createElement("div");
        return !!div.classList;
    }());
    _canAddEventListener = !!root.addEventListener;
    _canAttachEvent = !!root.attachEvent;
    
    Utility = function Utility() {
        var self = this;
        
        // Regex to find a class within el.className:
        self.filterClass = function findClass(cls) {
            return new RegExp("(^|\\s)" + cls + "(\\s|$)", "i");
        }
        
        // Say whether a specific class name is in el.className:
        self.hasClass = function hasClass(cls, el) {
            var findClass = self.filterClass(cls);
            if (el.className && findClass.test(el.className)) {
                return true;
            }
            return false;
        }
        
        // Add a class name to el.className:
        self.addClass = function addClass(cls, el) {
            if (_canUseClassList) {
                el.classList.add(cls);
            } else {
                el.className += (" " + cls);
            }
        };
        
        // Remove a class name from el.className:
        self.removeClass = function removeClass(cls, el) {
            var rc;
            if (_canUseClassList) {
                el.classList.remove(cls);
            } else {
                rc = self.filterClass(cls);
                el.className = el.className.replace(rc, "$1$2");
            }
        };
        
        // Get elements by class name, unfortunately inefficient in older browsers:
        self.getElementsByClassName = function getElementsByClassName(cls, domNode) {
            var node = domNode || document,
                descendants,
                descendantsWithClass,
                i;
            if (_canGetElementsByClassName) {// Faster than node.querySelectorAll
                return node.getElementsByClassName(cls);
            } else if (_canQuerySelectorAll) {// Much faster than what's in `else`
                return node.querySelectorAll("." + cls);
            } else {
                descendantsWithClass = [];
                descendants = node.getElementsByTagName("*");
                i = descendants.length;
                while (i--) {
                    if (self.hasClass(cls, descendants[i])) {
                        descendantsWithClass.push(descendants[i]);
                    }
                }
                if (!descendantsWithClass.length) {
                    return null;
                }
                return descendantsWithClass.reverse();// Since this uses `while`, `reverse()` returns a consistent order w/ the other ways to get these els.
            }
            return null;
        };
        
        // Wrap addEventListener and the old IE approach to save some redundant repetition (ha!).
        // Note that `this` is different in an event fired in IE's node.attachEvent, so be careful.
        self.newEventListener = function newEventListener(node, ev, callback, capture) {
            if (_canAddEventListener) {
                node.addEventListener(ev, callback, (!!capture));
            } else if (_canAttachEvent) {
                node.attachEvent(("on" + ev), callback);
            }
        };
    };
    
    // `Belt` is too clever for its own good, but it's short. The global name would more likely be something like `ProjectnameUtility` in a real environment. I'd probably use `utility.js` as the file-name, too.
    root.Belt = new Utility();
}(this, document));
