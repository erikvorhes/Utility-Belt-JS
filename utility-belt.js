(function (root) {
    "use strict";
    
    var Utility = function Utility() {
        var self = this;
        
        // Regex to find a class within .className
        self.filterClass = function findClass(cls) {
            return new RegExp("(^|\\s)" + cls + "(\\s|$)", "i");
        }
        
        // Boolean: does the el have a certain class?
        self.hasClass = function hasClass(cls, el) {
            var findClass = self.filterClass(cls);
            return el.className && findClass.test(el.className);
        }
        
        // Add a class to the el:
        self.addClass = function addClass(cls, el) {
            if (!!el.classList) {
                el.classList.add(cls);
            } else {
                el.className += (" " + cls);
            }
        };
        
        // Remove a class from the el:
        self.removeClass = function removeClass(cls, el) {
            var rc;
            if (!!el.classList) {
                el.classList.remove(cls);
            } else {
                rc = self.filterClass(cls);
                el.className = el.className.replace(rc, "$1$2");
            }
        };
        
        // Get elements by class name, handy but inefficient in older browsers:
        self.getElementsByClassName = function getElementsByClassName(cls, domNode) {
            var node = domNode || document,
                els,
                allEls,
                i;
            if (!!node.getElementsByClassName) {
                return node.getElementsByClassName(cls);
            } else if (!!node.querySelectorAll) {
                return node.querySelectorAll("." + cls);
            } else {
                allEls = node.getElementsByTagName("*");
                els = [];
                i = allEls.length;
                while (i--) {
                    if (self.hasClass(cls, allEls[i])) {
                        els.push(allEls[i]);
                    }
                }
                return els.reverse();
            }
            return null;
        };
        
        // Wrap addEventListener and the old IE approach to save some redundant repetition (ha!):
        self.newEventListener = function newEventListener(el, ev, callback, capture) {
            if (el.addEventListener) {
                el.addEventListener(ev, callback, (!!capture));
            } else if (el.attachEvent) {
                el.attachEvent(("on" + ev), callback);
            }
        };
    };
    
    // `Belt` is too clever for its own good, but it's short. The global name would more likely be something like `ProjecnametUtility` in a real environment. I'd probably use `utility.js` as the file-name, too.
    root.Belt = new Utility();
}(this));
