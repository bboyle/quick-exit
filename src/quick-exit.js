(function( window ) {
	'use strict';

	var history = window.history;
	var exitElement = document.getElementById( 'quick-exit' );
	var accessKeyCode;
	var eventFunction;


	function quickExit( event ) {
		window.document.body.style.opacity = 0;
		window.document.title = 'New Tab';
		// clears current frame only
		document.write( '' ); // eslint-disable-line no-implied-eval

		if ( history && history.replaceState ) {
			history.replaceState( null, 'Home', '/' );
		}

		window.location = this.href;

		event.preventDefault();
		return false;
	}


	function quickExitKeyboard( event ) {
		if ( event.keyCode === accessKeyCode ) {
			if ( /^(INPUT|TEXTAREA|SELECT)$/i.test( event.target.tagName )) {
				return;
			}
			quickExit.call( exitElement, event );
		}
	}


	if ( ! exitElement ) {
		return;
	}


	accessKeyCode = exitElement.getAttribute( 'accesskey' ).toUpperCase().charCodeAt( 0 );


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
