'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    grunt.initConfig({

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            bower: {
                files: ['bower.json'],
                tasks: ['wiredep']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                files: [
                    'app/*.html',
                    'app/views/{,*/}*.html',
                    'app/scripts/{,*/}*.js',
                    'app/styles/{,*/}*.css',
                    'app/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    'app/manifest.json',
                    'app/_locales/{,*/}*.json'
                ],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            }
        },

        // Grunt server and debug server setting
        connect: {
            options: {
                livereload: 35729,
                hostname: 'localhost',
                port: 9000
            },
            debug: {
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
            debug: '.tmp',
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
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
                'test/spec/{,*/}*.js'
            ]
        },

        // Automatically inject Bower components into the app
        wiredep: {
            app: {
                src: [
                    'app/newtab.html',
                    'app/options.html'
                ],
                exclude: [
                    'livereload'
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
                assetsDirs: ['dist', 'dist/images', 'dist/styles']
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
            options: {
                removeComments: true,
                collapseWhitespace: true
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'dist',
                    src: '*.html',
                    dest: 'dist'
                }, {
                    expand: true,
                    cwd: 'dist/views',
                    src: '{,*/}*.html',
                    dest: 'dist/views'
                }]
            }
        },

        // ng-annotate tries to make the code safe for minification automatically
        // by using the Angular long form for dependency injection.
        ngAnnotate: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/scripts',
                    src: '*.js',
                    dest: '.tmp/concat/scripts'
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
                        'views/{,*/}*.html',
                        'styles/fonts/{,*/}*.*',
                        '_locales/{,*/}*.json'
                    ]
                }]
            }
        },

        // Run some tasks in parallel to speed up build process
        concurrent: {
            debug: [],
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
                        target: 'scripts/background.js'
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
                    archive: function() {
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
        },

        // Jasmine tests:
        jasmine: {
            all: {
                options: {
                    specs: 'test/spec/{,*/}*.js'
                }
            }
        }

    });

    grunt.registerTask('debug', function() {
        grunt.task.run([
            'clean:debug',
            'wiredep',
            'concurrent:debug',
            'connect:debug',
            'watch'
        ]);
    });

    grunt.registerTask('test', [
        'clean:debug',
        'wiredep',
        'connect:test',
        'jasmine'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'chromeManifest:dist',
        'wiredep',
        'useminPrepare',
        'concurrent:dist',
        'concat',
        'ngAnnotate',
        'cssmin',
        'uglify',
        'copy',
        'usemin',
        'htmlmin',
        'compress'
    ]);

    grunt.registerTask('default', [
        'jshint',
        'test',
        'build'
    ]);
};
