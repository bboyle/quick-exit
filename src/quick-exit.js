(function( window ) {
	'use strict';

	var history = window.history;
	var exitElement = document.getElementById( 'quick-exit' );
	var accesskeyLinks = {};


	function quickExit( event, target ) {
		target = target || event.target;
		var href = target.href;

		window.document.body.style.opacity = 0;
		window.document.title = 'New Tab';
		// clears current frame only
		/* jshint -W060 */
		document.write( '' ); // eslint-disable-line no-implied-eval
		/* jshint +W060 */

		if ( history && history.replaceState ) {
			history.replaceState( null, 'Home', '/' );
		}

		// href = this.href || target.href;
		while ( ! href && target !== exitElement && target.parentNode ) {
			target = target.parentNode;
			href = target.href;
		}

		href = href || this.getElementsByTagName( 'a' )[ 0 ].href || 'about:blank';

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
			quickExit.call( this, event, accesskeyLinks[ event.keyCode ] );
		}
	}


	function init() {
		var eventFunction;
		var i;
		var accesskey;
		var link;

		var KEYS = {
			esc: 27
		};

		link = exitElement.getElementsByTagName( 'a' );
		for ( i = 0; i < link.length; i++ ) {

			accesskey = link[ i ].getAttribute( 'data-accesskey' );
			if ( accesskey ) {
				accesskey = KEYS[ accesskey.toLowerCase() ];

			} else {
				accesskey = link[ i ].getAttribute( 'accesskey' );
				if ( accesskey ) {
					accesskey = accesskey.toUpperCase().charCodeAt( 0 );
				}
			}

			if ( accesskey ) {
				accesskeyLinks[ accesskey ] = link[ i ];
			}
		}

		if ( document.addEventListener ) {
			eventFunction = 'addEventListener';
		} else if ( document.attachEvent ) {
			eventFunction = 'attachEvent';
		}

		if ( eventFunction ) {
			exitElement[ eventFunction ]( 'click', quickExit, true );
			if ( Object.keys( accesskeyLinks ).length ) {
				document[ eventFunction ]( 'keydown', quickExitKeyboard, true );
			}
		}
	}


	if ( exitElement ) {
		init();
	}

}( window.top ));
