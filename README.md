Quick exit button
=================

Button that sits on screen and provides a fast way for a user to exit the current website.
Intended to help users protect privacy. For example: when accessing information about domestic violence.

Features
--------

- clear page contents
- wipe current URL from history stack (defeats back button but **does not remove pages from history**)
- load another "safe" website
- progressive enhancement

### HTML

- quickly exit site
- bust out of frames
- **TODO**: keyboard accesskey

```html
<a id="quick-exit" target="_top" href="http://www.google.com/">Quick exit ➟</a>
```

### CSS

- easy to locate (fixed position)
- high contrast

```css
#quick-exit {
	position: fixed;
	right: 0;
	top: 20%;
	font-size: 1.7em;
	padding: .2em .7em;
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
}
#quick-exit:hover, #quick-exit:focus {
	transform: scale(1.2);
}
```

### JavaScript

- clear page contents
- wipe history state (hide from back button)

View [quick-exit.js](quick-exit.js)


Licence
-------

Available under [BSD-3-Clause](LICENSE).
