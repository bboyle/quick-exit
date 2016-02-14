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


	function init() {
		var addEventListener = document.addEventListener ? 'addEventListener' : 'attachEvent';
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


	if ( exitElement ) {
		init();
	}

}( window.top ));
