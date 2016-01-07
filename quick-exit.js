(function( window ) {
	'use strict';
	var history = window.history;
	var location = window.location;
	var exitElement = document.getElementById( 'quick-exit' );
	var accessKeyCode;
	var eventFunction;


	function quickExit( event ) {
		document.write( '' );

		if ( history && history.replaceState ) {
			history.replaceState( null, 'Home', '/' );
		}

		// if location is on same domain, it will replace current URL
		// otherwise back button *WILL* return to current page
		location.replace( this.href );

		event.preventDefault();
		return false;
	}


	function quickExitKeyboard( event ) {
		if ( event.keyCode === accessKeyCode ) {
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
