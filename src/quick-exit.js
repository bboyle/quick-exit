(function( window ) {
	'use strict';

	var history = window.history;
	var exitElement;
	var accesskeyLinks = {};


	function quickExit( event, target ) {
		target = target || event.target;
		var href = target.href;

		window.document.body.style.opacity = 0;
		window.document.title = 'New Tab';
		// clears current frame only
		while ( document.firstChild ) {
			document.removeChild( document.firstChild );
		}

		if ( history && history.replaceState ) {
			history.replaceState( null, 'Home', '/' );
		}

		// href = this.href || target.href;
		while ( ! href && target !== exitElement && target.parentNode ) {
			target = target.parentNode;
			href = target.href;
		}

		href = href || target.getElementsByTagName( 'a' )[ 0 ].href || 'about:blank';

		/* jshint -W040 */
		window.location = href;
		/* jshint +W040 */

		event.preventDefault();
		return false;
	}

	function quickExitKeyboard( event ) {
		if ( accesskeyLinks[ event.keyCode ]) {
			if ( /^(INPUT|TEXTAREA|SELECT|BUTTON)$/i.test( event.target.tagName )) {
				return;
			}
			quickExit.call( event.target, event, accesskeyLinks[ event.keyCode ] );
		}
	}


	function setupEventHandlers( addEventListener ) {
		var i;
		var accesskey, link;

		function getAccesskey( element ) {
			var KEYS = {
				esc: 27
			};
			var accesskey = element.getAttribute( 'data-accesskey' ) || element.getAttribute( 'accesskey' );

			if ( /^[a-zA-Z]$/.test( accesskey )) {
				return accesskey.toUpperCase().charCodeAt( 0 );
			} else if ( accesskey ) {
				return KEYS[ accesskey.toLowerCase() ];
			}

			return null;
		}

		link = exitElement.getElementsByTagName( 'a' );
		for ( i = 0; i < link.length; i++ ) {
			accesskey = getAccesskey( link[ i ]);

			if ( accesskey ) {
				accesskeyLinks[ accesskey ] = link[ i ];
			}
		}

		exitElement[ addEventListener ]( 'click', quickExit, true );
		if ( Object.keys( accesskeyLinks ).length ) {
			document[ addEventListener ]( 'keydown', quickExitKeyboard, true );
		}
	}


	function init() {
		var addEventListener = document.addEventListener ? 'addEventListener' : 'attachEvent';

		if ( exitElement ) {
			return; // aleady setup
		}

		exitElement = document.getElementById( 'quick-exit' );

		if ( exitElement ) {
			// setup now
			setupEventHandlers( addEventListener );
		} else {
			// setup on ready/load
			document[ addEventListener ]( 'DOMContentLoaded', init );
			document[ addEventListener ]( 'load', init );
		}
	}

	init();

}( window.top ));
