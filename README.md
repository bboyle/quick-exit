Quick exit button
=================

Button that sits on screen and provides a fast way for a user to exit the current website.
Intended to help users protect privacy. For example: when accessing information about domestic violence.

[![bitHound Overall Score](https://www.bithound.io/github/bboyle/quick-exit/badges/score.svg)](https://www.bithound.io/github/bboyle/quick-exit)
[![bitHound Dependencies](https://www.bithound.io/github/bboyle/quick-exit/badges/dependencies.svg)](https://www.bithound.io/github/bboyle/quick-exit/gh-pages/dependencies/npm)
[![bitHound Dev Dependencies](https://www.bithound.io/github/bboyle/quick-exit/badges/devDependencies.svg)](https://www.bithound.io/github/bboyle/quick-exit/gh-pages/dependencies/npm)

Features
--------

- clear page contents
- replace current URL with '/' 'Home' (requires [historyState](http://caniuse.com/#feat=history))
- load another "safe" website
- progressive enhancement

### HTML

- quickly exit site
- bust out of frames
- keyboard accesskey
- support for `Esc` as an access key using `data-accesskey="Esc"` on links
- display an accesskey message using `data-accesskey="Esc"` on the container
- display an optional message using `data-title="http://www.google.com"`

```html
<div id="quick-exit" data-accesskey="q" data-title="http://www.google.com/">
    <a target="_top" href="http://www.google.com/" accesskey="q">Quick exit ➟</a>
</div>
```

```html
<div id="quick-exit" data-accesskey="Esc">
    <a target="_top" href="http://www.google.com/" data-accesskey="Esc">Quick exit ➟</a>
</div>
```

### CSS

- easy to locate (fixed to right-edge of browser, next to scroll bar)
- high contrast (based on warning road signs)
- focus/hover indication
- display accesskey hint
- `data-accesskey="q"` displayed as *PRESS 'Q' TO EXIT* above links
- `data-title="http://www.google.com" displayed a message below links
- override text by setting the `content` property for `#quick-exit::before` and `#quick-exit::after`

![Screenshot of default and hover states](quick-exit-css.png)

View [quick-exit.css](src/quick-exit.css)

### JavaScript

- clear page contents
- replace current URL with '/' 'Home' (mask back button behaviour)
- listen for accesskey (without modifiers)
- hide window.top frame contents (using opacity)
- hide window.top page title (using 'New Tab')

View [quick-exit.js](src/quick-exit.js)


Licence
-------

Available under [BSD-3-Clause](LICENSE).
