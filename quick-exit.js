function quickExit( event ) {
	document.write( '' );

	if ( history && history.replaceState ) {
		history.replaceState( null, 'Home', '/' );
	}

	// event.preventDefault();
	window.top.location.replace( this.href );
}

$( '#quick-exit' )
	.click( quickExit )
	.attr( 'target', '_top' )
;
