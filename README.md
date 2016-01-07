Quick exit button
=================

Button that sits on screen and provides a fast way for a user to exit the current website.
Intended to help users protect privacy. For example: when accessing information about domestic violence.

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

```html
<a id="quick-exit" target="_top" href="http://www.google.com/" accesskey="q">Quick exit ➟</a>
```

### CSS

- easy to locate (fixed to right-edge of browser, next to scroll bar)
- high contrast (based on warning road signs)
- focus/hover indication
- display accesskey hint

![Screenshot of default and hover states](quick-exit-css.png)

```css
#quick-exit {
	position: fixed;
	right: 0;
	top: 20%;
	font-size: 200%;
	padding: .2em .7em;
	white-space: nowrap;
	background: #F7D418;
	color: #000;
	border: 0.2em solid #000;
	border-radius: 1.7em 0 0 1.7em;
	border-right: none;
	cursor: pointer;
	text-decoration: none;
	font-weight: bold;
	box-shadow:
		0 0 0 0.1em #F7D418,
		2px 2px 5px 0.1em rgba(0, 0, 0, 0.5);
	transform: translateX(1.7em);
	transition: transform 10ms;
	z-index: 99999;
}
#quick-exit:hover,
#quick-exit:focus {
	transform: scale(1.2);
}
#quick-exit[accesskey]::before {
    content: "Press '" attr(accesskey) "' to exit";
    text-transform: uppercase;
    display: block;
    font-size: 50%;
}
```

### JavaScript

- clear page contents
- wipe history state (hide from back button)
- listen for accesskey (without modifiers)

View [quick-exit.js](quick-exit.js)


Licence
-------

Available under [BSD-3-Clause](LICENSE).
