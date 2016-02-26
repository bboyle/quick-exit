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
					concise: true
				},
				files: {
					'log/casper-acceptance.xml' : [ 'test/*spec.js' ]
				}
			}
		},

		// build
		uglify: {
			js: {
				options: {
					sourceMap: true
				},
				files: {
					'dist/quick-exit.min.js': [ 'src/quick-exit.js' ]
				}
			}
		},

		sass: {
			src: {
				options: {
					sourceComments: true,
					outputStyle: 'expanded',
					indentType: 'tab',
					indentWidth: 1,
					linefeed: 'crlf'
				},
				files: {
					'src/quick-exit.css': 'src/quick-exit.scss'
				}
			},
			dist: {
				options: {
					outputStyle: 'compressed',
					linefeed: 'crlf'
				},
				files: {
					'dist/quick-exit.min.css': 'src/quick-exit.scss'
				}
			}
		},

		// watch
		watch: {
			options: {
				spawn: false
			},
			sass: {
				files: 'src/*.scss',
				tasks: [ 'sass:src' ]
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
	grunt.loadNpmTasks( 'grunt-contrib-uglify' );
	grunt.loadNpmTasks( 'grunt-sass' );


	// helpers
	grunt.registerTask( 'test', [ 'eslint', 'connect:testserver', 'casper' ]);
	grunt.registerTask( 'build', [ 'sass:src', 'test', 'uglify', 'sass:dist' ]);
	grunt.registerTask( 'default', [ 'sass:src', 'test', 'watch' ]);
};
