module.exports = function(grunt){

grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),

		// Start of style grunt 
		sass_globbing: {
			your_target: {
				files: {
					'sass/main.scss': [
									'sass/common/**/*.scss',
									'sass/pages/**/*.scss'
								]
					},
				options: {
					useSingleQuotes: true
				}
			}
		},
		sass: {
			dist: {
				options: {
				  "sourcemap=none": '',
				  // nested, compact, compressed, expanded
				  'style':'expanded'
				},
				files: {
					'style/style.css' : 'sass/main.scss'
				}
			}
		},

		watch: {
			options: {
				livereload: true,
			},
			html: {
				files: ['*.html']
			},
			js: {
				files: ['js/**/*.js'],
				tasks: ['concat']
			},
			sass: {
			    files: '**/*.scss',
			    tasks: ['sass_globbing','sass']
			  }
		},
		
		 // End of style grunt 

		 

		concat: {
			js: {
				files: {
			        'build/js/concat.js': ['js/*.js'],
			        'build/js/concat.lib.js': [
								'bower_components/jquery/dist/jquery.min.js',
								'bower_components/angular/angular.min.js',
								'bower_components/bootstrap/dist/js/bootstrap.min.js'
							]
			    }
			},
			css: {
				files: {
					'build/css/concat.css': [
								'style/*.css',
								'bower_components/bootstrap/dist/css/bootstrap.min.css'
							]
				}
				
			}
		},//End of concat

		cssmin: {
			target: {
				files: [{
					expand: true,
					cwd: 'build/css',
					src: ['*.css', '!*.min.css'],
					dest: 'build/css/',
					ext: '.min.css'
				}]
			}
		},

		uglify: {
		    options: {
		      mangle: {
		        except: ['jQuery', 'Angular']
		      }
		    },
		    my_target: {
		      files: {
		        'build/js/output.min.js': ['build/js/*.js']
		      }
		    }
		},

		clean : {
		    yourTarget : {
		        src : [ 
		        		'build/js/concat.js',
		        		'build/css/concat.css'
		        	]
		    }
		},
		express: {
			all: {
				options: {
					port: 8000,
					hostname: 'localhost',
					bases: ['.'],
					livereload: true
				}
			}
		}

	});

	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-autoprefixer');
	// Creating main.css
	grunt.loadNpmTasks('grunt-sass-globbing');
	// Concating js and css
	grunt.loadNpmTasks('grunt-contrib-concat');
	// Uglify js
	grunt.loadNpmTasks('grunt-contrib-uglify');
	// Uglify css
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	// Clean concated files from build
	grunt.loadNpmTasks('grunt-contrib-clean');

	grunt.loadNpmTasks('grunt-express');



	/*
		Command list
		
		grunt dev	
		grunt watch

		grunt deploy
	*/
	grunt.registerTask('server', ['express','watch']);
	grunt.registerTask('dev', ['concat','sass_globbing','sass']);

	grunt.registerTask('deploy', ['sass_globbing','sass', 'concat', 'uglify', 'cssmin', 'clean']);
}