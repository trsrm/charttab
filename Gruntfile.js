'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.initConfig({

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['bowerInstall']
            },
            js: {
                files: ['app/scripts/{,*/}*.js'],
                tasks: ['jshint'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            styles: {
                files: ['app/styles/{,*/}*.css'],
                tasks: [],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    'app/*.html',
                    'app/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    'app/manifest.json',
                    'app/_locales/{,*/}*.json'
                ]
            }
        },

        // Grunt server and debug server setting
        connect: {
            options: {
                port: 9000,
                livereload: 35729,
                // change this to '0.0.0.0' to access the server from outside
                hostname: 'localhost'
            },
            chrome: {
                options: {
                    open: false,
                    base: [
                        'app'
                    ]
                }
            },
            test: {
                options: {
                    open: false,
                    base: [
                        'test',
                        'app'
                    ]
                }
            }
        },

        // Empties folders to start fresh
        clean: {
            chrome: {},
            dist: {
                files: [{
                    dot: true,
                    src: [
                        'dist/*',
                        '!dist/.git*'
                    ]
                }]
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                'app/scripts/{,*/}*.js',
                '!app/scripts/vendor/*',
                'test/spec/{,*/}*.js'
            ]
        },

        // Jasmine tests:
        jasmine: {
            all: {
                options: {
                    specs: 'test/spec/{,*/}*.js'
                }
            }
        },

        // Automatically inject Bower components into the HTML file
        bowerInstall: {
            app: {
                src: [
                    'app/*.html'
                ]
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            options: {
                dest: 'dist'
            },
            html: [
                'app/newtab.html',
                'app/options.html'
            ]
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            options: {
                assetsDirs: ['dist', 'dist/images']
            },
            html: ['dist/{,*/}*.html'],
            css: ['dist/styles/{,*/}*.css']
        },

        // The following *-min tasks produce minifies files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'app/images',
                    src: '{,*/}*.{gif,jpeg,jpg,png}',
                    dest: 'dist/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'app/images',
                    src: '{,*/}*.svg',
                    dest: 'dist/images'
                }]
            }
        },

        htmlmin: {
            dist: {
                options: {
                    // removeCommentsFromCDATA: true,
                    // collapseWhitespace: true,
                    // collapseBooleanAttributes: true,
                    // removeAttributeQuotes: true,
                    // removeRedundantAttributes: true,
                    // useShortDoctype: true,
                    // removeEmptyAttributes: true,
                    // removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: 'app',
                    src: '*.html',
                    dest: 'dist'
                }]
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: 'app',
                    dest: 'dist',
                    src: [
                        '*.{ico,png,txt}',
                        'images/{,*/}*.{webp,gif}',
                        '{,*/}*.html',
                        'styles/{,*/}*.css',
                        'styles/fonts/{,*/}*.*',
                        '_locales/{,*/}*.json'
                    ]
                }]
            }
        },

        // Run some tasks in parallel to speed up build process
        concurrent: {
            chrome: [],
            dist: [
                'imagemin',
                'svgmin'
            ],
            test: []
        },

        // Auto buildnumber, exclude debug files. smart builds that event pages
        chromeManifest: {
            dist: {
                options: {
                    buildnumber: true,
                    indentSize: 2,
                    background: {
                        target: 'scripts/background.js',
                        exclude: [
                            'scripts/chromereload.js'
                        ]
                    }
                },
                src: 'app',
                dest: 'dist'
            }
        },

        // Compres dist files to package
        compress: {
            dist: {
                options: {
                    archive: function () {
                        var manifest = grunt.file.readJSON('app/manifest.json');
                        return 'package/charttab-' + manifest.version + '.zip';
                    }
                },
                files: [{
                    expand: true,
                    cwd: 'dist/',
                    src: ['**'],
                    dest: ''
                }]
            }
        }
    });

    grunt.registerTask('debug', function () {
        grunt.task.run([
            'jshint',
            'concurrent:chrome',
            'connect:chrome',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'connect:test',
        'jasmine'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'chromeManifest:dist',
        'useminPrepare',
        'concurrent:dist',
        'cssmin',
        'concat',
        'uglify',
        'copy',
        'usemin',
        'compress'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);
};
