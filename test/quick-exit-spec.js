/*global casper, console*/
var url = 'http://localhost:9999/test/test.html';

// Given a customer visits the page
// when they use the quick exit button
// then they will see google.com
casper.test.begin( 'quick exit', 3, function suite( test ) {
	casper.start( url )
	.then(function() {
		test.assertExists( 'a#quick-exit', 'Quick exit link is present' );

		this.click( 'a#quick-exit' );
		test.assertElementCount( '*', 0, 'Page is empty after quick exit click' );
	})
	.then(function() {
		test.assertUrlMatch( /http:\/\/www\.google\.com/, 'Landed on google.com after clicking quick exit' );
	})

	.run(function() {
		test.done();
	});
});
