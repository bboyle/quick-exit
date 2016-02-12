(function( window ) {
	'use strict';

	var history = window.history;
	var exitElement = document.getElementById( 'quick-exit' );


	function quickExit( event ) {
		var href = this.href || event.target.href || 'about:blank';

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
		window.location = href;
		/* jshint +W040 */

		event.preventDefault();
		return false;
	}


	if ( ! exitElement ) {
		return;
	}


	function init() {
		var eventFunction;
		var i;
		var accesskey;
		var link;

		var KEYS = {
			esc: 27
		};

		var accesskeyLinks = {};

		function quickExitKeyboard( event ) {
			if ( accesskeyLinks[ event.keyCode ]) {
				if ( /^(INPUT|TEXTAREA|SELECT|BUTTON)$/i.test( event.target.tagName )) {
					return;
				}
				quickExit.call( accesskeyLinks[ event.keyCode ], event );
			}
		}

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
	init();


}( window.top ));
