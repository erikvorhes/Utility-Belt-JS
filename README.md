# Handy JavaScript without the jQueries, et al.

Not much to say here, but **UtilityBelt.js** is a simple wrapper to support common tasks that rely on `className`s. What does it do? Glad you asked!

## Features

* Instantiate with `const Belt = new UtilityBelt();` or whatever.
* Add a class name to an element with `Belt.addClassName(className, el);`.
* Remove a class name from an element with  `Belt.removeClassName(className, el);`
* See whether an element has a certain class name with `Belt.hasClassName(className, el);`.
* Get all elements that have a certain class name with `Belt.getElementsByClassName(className, element);` (`element` defaults to `document`).
* Add an event listener with `Belt.addEventListener(eventTarget, event, callback, capture);` (`capture` defaults to `false`).
* Fire a function when the DOM has loaded (before `window.onload`) with `Belt.onDOMReady(callback);`.

**N.b.:** This set of utilities is offered as-is (for now). Eventually I *might* get it set up for use with Babel or other tools that convert ES2015 classes into objects and handle arrow functions. Right now this project exists as an intellectual exercise and to keep track of current and historical approaches to dealing with class names in JavaScript.

Licensed using the [MIT License][mit].

[mit]: https://github.com/erikvorhes/mit-license
