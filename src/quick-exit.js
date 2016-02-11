(function( window ) {
	'use strict';

	var KEYS = {
		esc: 27
	};

	var history = window.history;
	var exitElement = document.getElementById( 'quick-exit' );
	var accessKeyCode;
	var eventFunction;


	function quickExit( event ) {
		window.document.body.style.opacity = 0;
		window.document.title = 'New Tab';
		// clears current frame only
		/* jshint -W060 */
		document.write( '' ); // eslint-disable-line no-implied-eval
		/* jshint +W060 */

		if ( history && history.replaceState ) {
			history.replaceState( null, 'Home', '/' );
		}

		/* jshint -W040 */
		window.location = this.href;
		/* jshint +W040 */

		event.preventDefault();
		return false;
	}


	function quickExitKeyboard( event ) {
		if ( event.keyCode === accessKeyCode ) {
			if ( /^(INPUT|TEXTAREA|SELECT|BUTTON)$/i.test( event.target.tagName )) {
				return;
			}
			quickExit.call( exitElement, event );
		}
	}


	if ( ! exitElement ) {
		return;
	}


	accessKeyCode = exitElement.getAttribute( 'data-accesskey' );
	if (accessKeyCode) {
		accessKeyCode = KEYS[ accessKeyCode.toLowerCase() ];

	} else {
		accessKeyCode = exitElement.getAttribute( 'accesskey' );
		if ( accessKeyCode ) {
			accessKeyCode = accessKeyCode.toUpperCase().charCodeAt( 0 );
		}
	}


	if ( document.addEventListener ) {
		eventFunction = 'addEventListener';
	} else if ( document.attachEvent ) {
		eventFunction = 'attachEvent';
	}
	if ( eventFunction ) {
		exitElement[ eventFunction ]( 'click', quickExit, true );
		document[ eventFunction ]( 'keydown', quickExitKeyboard, true );
	}


}( window.top ));
