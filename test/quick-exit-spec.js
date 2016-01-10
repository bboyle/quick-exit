/*global casper */
const TEST_URL = 'http://localhost:9999/test/test.html';
const TEST_URL_UNLOAD = 'http://localhost:9999/test/unload.html';


casper.test.begin( 'quick exit (click)', 4, function suite( test ) {

	casper.start()

	.thenOpen( TEST_URL )
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

	.thenOpen( TEST_URL )
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


casper.test.begin( 'quick exit (keyboard - forms integration)', 8, function suite( test ) {

	casper.start()

	.thenOpen( TEST_URL )
	.then(function() {
		test.assertExists( 'a#quick-exit[accesskey=q]', 'accesskey is Q' );

		test.assertExists( 'input[type=text][name=text_input]', 'text input is present' );
		this.sendKeys( 'input[type=text][name=text_input]', 'Quentin' );
		test.assertField( 'text_input', 'Quentin', 'accesskey ignored for text input' );

		test.assertExists( 'textarea[name=textarea]', 'textarea is present' );
		this.sendKeys( 'textarea[name=textarea]', 'The quick brown fox' );
		test.assertField( 'textarea', 'The quick brown fox', 'accesskey ignored for textarea' );

		test.assertExists( 'select[name=select]', 'select is present' );
		test.assertExists( 'option[value=Queensland]', 'option for "Queensland" is present' );
		this.click( 'select[name=select]' ); // focus for sendKeys
		this.sendKeys( 'select[name=select]', 'q' );
		test.assertField( 'select', 'Queensland', 'accesskey ignored for select' );
	})

	.run(function() {
		test.done();
	});
});


casper.test.begin( 'quick exit (unload)', 4, function suite( test ) {

	casper.start()

	.thenOpen( TEST_URL_UNLOAD )
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
