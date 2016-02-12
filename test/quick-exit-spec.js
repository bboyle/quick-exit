/*global casper */
const TEST_URL = 'http://localhost:9999/test/test.html';
const TEST_URL_UNLOAD = 'http://localhost:9999/test/unload.html';
const TEST_URL_DOMAIN = 'http://bboyle.github.io/quick-exit/test/localhost.html';
const TEST_URL_ESCAPE = 'http://localhost:9999/test/test-escape.html';
const TEST_URL_ACCESSKEY = 'http://localhost:9999/test/test-accesskey.html';
const TEST_URL_MULTIPLE = 'http://localhost:9999/test/test-multiple.html';


function standardBehaviourTest( url ) {
	return function suite( test ) {

		casper.start()

		.thenOpen( url )
		.then(function() {
			test.assertExists( '#quick-exit', 'Quick exit block is present' );
			test.assertExists( '#quick-exit a', 'Quick exit link is present' );

			this.click( '#quick-exit a' );
			test.assertElementCount( '*', 0, 'Page is empty after quick exit click' );
		})

		.then(function() {
			test.assertUrlMatch( /^http:\/\/www\.google\.com/, 'Landed on google.com after clicking quick exit' );
		})

		.back()
		.then(function() {
			test.assertUrlMatch( new RegExp( '^' + url.replace( /^(.*:\/\/[^/]+\/).*/, '$1' ) + '$' ), 'Landed on / after back()' );
		})

		.run(function() {
			test.done();
		});
	};
}

function keyboardBehaviourTest( url, accesskey, urlRegex ) {
	return function suite( test ) {

		casper.start()

		.thenOpen( url )
		.then(function() {
			test.assertExists( '#quick-exit', 'Quick exit link is present' );
			this.sendKeys( 'body', casper.page.event.key[ accesskey ] );
			test.assertElementCount( '*', 0, 'Page is empty after quick exit using ' + accesskey + ' keyboard shortcut' );
		})

		.then(function() {
			test.assertUrlMatch( urlRegex, 'Landed on google.com after clicking quick exit' );
		})

		.back()
		.then(function() {
			test.assertUrlMatch( /^http:\/\/localhost:9999\/$/, 'Landed on localhost:9999/ after back()' );
		})

		.run(function() {
			test.done();
		});
	};
}


casper.test.begin( 'quick exit (click)', 5, standardBehaviourTest( TEST_URL ));
casper.test.begin( 'quick exit (unload)', 5, standardBehaviourTest( TEST_URL_UNLOAD ));
casper.test.begin( 'quick exit (same origin)', 5, standardBehaviourTest( TEST_URL_DOMAIN ));

casper.test.begin( 'quick exit (accesskey Escape)', 4, keyboardBehaviourTest( TEST_URL_ESCAPE, 'Escape', /google\.com/ ));
casper.test.begin( 'quick exit (accesskey Q)', 4, keyboardBehaviourTest( TEST_URL_ACCESSKEY, 'Q', /google\.com/ ));


casper.test.begin( 'quick exit (accesskey Q - forms integration)', 8, function suite( test ) {

	casper.start()

	.thenOpen( TEST_URL_ACCESSKEY )
	.then(function() {
		test.assertExists( '#quick-exit a[accesskey="q"]', 'accesskey is Q' );

		test.assertExists( 'input[type=text][name="text_input"]', 'text input is present' );
		this.sendKeys( 'input[type=text][name="text_input"]', 'Quentin' );
		test.assertField( 'text_input', 'Quentin', 'accesskey ignored for text input' );

		test.assertExists( 'textarea[name="textarea"]', 'textarea is present' );
		this.sendKeys( 'textarea[name="textarea"]', 'The quick brown fox' );
		test.assertField( 'textarea', 'The quick brown fox', 'accesskey ignored for textarea' );

		test.assertExists( 'select[name="select"]', 'select is present' );
		test.assertExists( 'option[value="Queensland"]', 'option for "Queensland" is present' );
		this.click( 'select[name="select"]' ); // focus for sendKeys
		this.sendKeys( 'select[name="select"]', 'q' );
		test.assertField( 'select', 'Queensland', 'accesskey ignored for select' );
	})

	.run(function() {
		test.done();
	});
});

casper.test.begin( 'no accesskey by default', 5, function suite( test ) {
	casper.start()

	.thenOpen( TEST_URL )
	.then(function() {
		test.assertExists( '#quick-exit', 'Quick exit link is present' );
		test.assertDoesntExist( '#quick-exit a[accesskey]', 'Quick exit link does not have accesskey attribute' );
		test.assertDoesntExist( '#quick-exit a[data-accesskey]', 'Quick exit link does not have data-accesskey attribute' );

		this.sendKeys( 'body', casper.page.event.key.Escape );
	})

	.then(function() {
		test.assertUrlMatch( /^http:\/\/localhost:9999\/test\/test\.html/, 'Still on test page after \'Escape\''  );

		this.sendKeys( 'body', casper.page.event.key.Q );
	})

	.then(function() {
		test.assertUrlMatch( /^http:\/\/localhost:9999\/test\/test\.html/, 'Still on test page after \'Q\''  );
	})

	.run(function() {
		test.done();
	});

});


// multiple links
casper.test.begin( 'multiple exit (link click)', 4, function suite( test ) {
	casper.start()

	.thenOpen( TEST_URL_MULTIPLE )
	.then(function() {
		test.assertExists( '#quick-exit', 'Quick exit container is present' );
		test.assertExists( '#quick-exit li:nth-child(1) a[href*="bom.gov.au"]', 'BOM quick exit link is present' );
		test.assertExists( '#quick-exit li + li + li a[href*="twitter"]', 'twitter link is third' );

		// test clicking on a child link (not the first)
		this.click( '#quick-exit a[href*="twitter"]' );
	})

	.then(function() {
		test.assertUrlMatch( /^https?:\/\/twitter\.com/, 'Landed on twitter.com after clicking quick exit' );
	})

	.run(function() {
		test.done();
	});
});

casper.test.begin( 'multiple exit (link child click)', 4, function suite( test ) {
	casper.start()

	.thenOpen( TEST_URL_MULTIPLE )
	.then(function() {
		test.assertExists( '#quick-exit', 'Quick exit container is present' );
		test.assertExists( '#quick-exit li:nth-child(1) a[href*="bom.gov.au"]', 'BOM quick exit link is present' );
		test.assertExists( '#quick-exit li:nth-child(2) a[href*="facebook"] > svg > path', 'facebook link svg > path is present' );

		// test clicking on SVG <path> element - NOT first link
		this.click( '#quick-exit a[href*="facebook"] > svg > path' );
	})

	.then(function() {
		test.assertUrlMatch( /^https?:\/\/www\.facebook\.com/, 'Landed on facebook.com after clicking quick exit (SVG <path> element)' );
	})

	.run(function() {
		test.done();
	});
});

casper.test.begin( 'multiple exit (default click)', 3, function suite( test ) {
	casper.start()

	.thenOpen( TEST_URL_MULTIPLE )
	.then(function() {
		test.assertExists( '#quick-exit', 'Quick exit container is present' );
		test.assertExists( '#quick-exit a[href*="bom.gov.au"]', 'BOM quick exit link is present' );

		// clicking on #quick-exit container
		this.click( '#quick-exit' );
	})

	.then(function() {
		test.assertUrlMatch( /^https?:\/\/www\.bom\.gov\.au/, 'Landed on BOM (first link) after clicking quick exit container' );
	})

	.run(function() {
		test.done();
	});
});

casper.test.begin( 'multiple quick exit (accesskey T)', 4, keyboardBehaviourTest( TEST_URL_MULTIPLE, 'T', /twitter\.com/ ));
casper.test.begin( 'multiple quick exit (accesskey F)', 4, keyboardBehaviourTest( TEST_URL_MULTIPLE, 'F', /facebook\.com/ ));
