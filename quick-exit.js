(function( window ) {
	'use strict';
	var history = window.history;
	var location = window.location;

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


	var qe = document.getElementById( 'quick-exit' );
	if ( ! qe ) {
		return;
	}

	if ( document.addEventListener ) {
		qe.addEventListener( 'click', quickExit, true );
	} else if ( document.attachEvent ) {
		qe.attachEvent( 'onclick', quickExit );
	}

}( window.top ));
