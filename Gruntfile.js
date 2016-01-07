/*global module */
module.exports = function( grunt ) {

	// var pkg = grunt.file.readJSON( 'package.json' );

	// config
	grunt.initConfig({

		// local web server
		connect: {
			options: {
				base: './'
			},
			testserver: {
				options: {
					port: 9999
				}
			}
		},

		// code qa
		eslint: {
			app:   { src: 'src/*.js' },
			tests: { src: 'test/*.js' },
			build: { src: 'Gruntfile.js' }
		},

		// acceptance tests
		casper: {
			acceptance: {
				options: {
					test: true,
					concise: true,
					failFast: true
				},
				files: {
					'log/casper-acceptance.xml' : [ 'test/*spec.js' ]
				}
			}
		},

		// watch
		watch: {
			options: {
				spawn: false
			},
			js: {
				files: 'src/*.js',
				tasks: [ 'eslint:app', 'casper:acceptance' ]
			},
			tests: {
				files: 'test/**',
				tasks: [ 'eslint:tests', 'casper:acceptance' ]
			}
		}
	});


	// plugins
	grunt.loadNpmTasks( 'grunt-casper' );
	grunt.loadNpmTasks( 'grunt-contrib-connect' );
	grunt.loadNpmTasks( 'grunt-eslint' );
	grunt.loadNpmTasks( 'grunt-contrib-watch' );


	// helpers
	grunt.registerTask( 'test', [ 'eslint', 'connect:testserver', 'casper' ]);
	grunt.registerTask( 'default', [ 'test', 'watch' ]);
};
