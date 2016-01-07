/*global casper */
var url = 'http://localhost:9999/test/test.html';


casper.test.begin( 'quick exit (click)', 4, function suite( test ) {

	casper.start()

	.thenOpen( url )
	.then(function() {
		test.assertExists( 'a#quick-exit', 'Quick exit link is present' );

		this.click( 'a#quick-exit' );
		test.assertElementCount( '*', 0, 'Page is empty after quick exit click' );
	})

	.then(function() {
		test.assertUrlMatch( /^http:\/\/www\.google\.com/, 'Landed on google.com after clicking quick exit' );
	})

	.back()
	.then(function() {
		test.assertUrlMatch( /^http:\/\/localhost:9999\/$/, 'Landed on localhost:9999/ after back()' );
	})

	.run(function() {
		test.done();
	});
});


casper.test.begin( 'quick exit (keyboard)', 5, function suite( test ) {

	casper.start()

	.thenOpen( url )
	.then(function() {
		test.assertExists( 'a#quick-exit', 'Quick exit link is present' );
		test.assertExists( 'a#quick-exit[accesskey=q]', 'accesskey is Q' );

		this.sendKeys( 'body', 'q' );
		test.assertElementCount( '*', 0, 'Page is empty after quick exit click' );
	})

	.then(function() {
		test.assertUrlMatch( /^http:\/\/www\.google\.com/, 'Landed on google.com after clicking quick exit' );
	})

	.back()
	.then(function() {
		test.assertUrlMatch( /^http:\/\/localhost:9999\/$/, 'Landed on localhost:9999/ after back()' );
	})

	.run(function() {
		test.done();
	});
});
