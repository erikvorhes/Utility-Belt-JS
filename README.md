# Handy JavaScript without the jQueries, et al.

Not much to say here, but **utility-belt.js** is a simple wrapper for some common tasks. What does it do? Glad you asked!

## Features

* Add a class to an element with `Belt.addClass(className, el);`
* Remove a class from an element with  `Belt.removeClass(className, el);`
* See whether an element has a certain class with `Belt.hasClass(className, el);`
* Get all elements that have a certain class with `Belt.getElementsByClassName(className, domNode);`
* Add an event listener with `Belt.newEventListener(el, evt, callback, capture);` (oh, and `capture` defaults to `false`)

That's it so far.

MIT License, I'll link to something if I feel like it. Enjoy!