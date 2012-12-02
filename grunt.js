/*global module:false*/

module.exports = function(grunt) {
    'use strict';

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    //grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-rm');

    grunt.initConfig({

        // Package info, used by some tasks
        pkg: '<json:package.json>',

        // Project metadata, used by some tasks
        meta: {
            banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
                '<%= pkg.homepage ? "* " + pkg.homepage + "\n" : "" %>' +
                '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
                ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */'
        },

        // List of files to lint with JSHint
        lint: {
            grunt: 'grunt.js',
            main: 'src/main.js',
            js: 'src/js/**/*.js',
            //lib: 'src/lib/**/*.js',
            test: 'test/**/*.js'
        },

        // List of files to test with QUnit
        qunit: {
            files: ['test/**/*.html']
        },

        // List of files to be concatenated
        // This is N/A since we are using the Require r.js optimizer
        concat: {
        },

        // List of files to be minified with Uglify.js
        // This is N/A since we are using the Require r.js optimizer
        min: {
        },

        // Less CSS compiler configuration
        less: {
            dist: {
                options: {
                    paths: ['src/css'],
                    yuicompress: true
                },
                files: {
                    "src/css/style.css": "src/css/style.less"
                }
            }
        },

        // Require r.js optimizer settings
        // Note: paths must be copied in from main.js for some reason
        requirejs: {
            compile: {
                options: {
                    // See https://github.com/jrburke/r.js/blob/master/build/example.build.js
                    baseUrl: "src",
                    dir: "dist",
                    paths: {
                        // Require.js plugins
                        text: 'lib/require-2.1.1/text',
                        domReady: 'lib/require-2.1.1/domReady',
                        i18n: 'lib/require-2.1.1/i18n',
                        tpl: 'lib/require-2.1.1/tpl',

                        // jQuery
                        jquery: 'lib/jquery-1.8.2/jquery',

                        // Underscore
                        //underscore: 'lib/underscore-1.4.2/underscore',
                        underscore: 'lib/lodash-0.10.0/lodash',

                        // Backbone
                        //backbone: 'lib/backbone-0.9.2/backbone',
                        backbone: 'lib/backbone-0.9.2/backbone-AMD',

                        // Backbone.Marionette
                        // Has AMD support built-in (doesn't need to be shimmed)
                        marionette: 'lib/backbone.marionette-1.0.0-beta5-AMD/backbone.marionette',
                        marionetteAsync: 'lib/backbone.marionette.async-0.2.0-AMD/backbone.marionette.async',

                        // Backbone.BackStack
                        backstack: 'lib/backstack-1.1.2/backstack',

                        // Twitter Bootstrap JavaScript
                        bootstrap: 'lib/twitter-bootstrap-2.2.1/js/bootstrap'
                    },

                    modules: [
                        {
                            name: "main"
                        }
                    ]
                }
            }
        },

        /* Doesn't work
        clean: {
            dist: [
                'dist/build.txt',           // Generated by r.js optimizer
                'dist/css/style.less',      // Used to generate style.css
                'dist/js/__/*.js',          // Optimized into main.js
                'dist/lib/__/*.js',         // Optimized into main.js
                'dist/web.config'           // Not used
            ]
        },
        */

        rm: {
            dist: [
                'dist/build.txt',           // Generated by r.js optimizer
                'dist/css/style.less',      // Used to generate style.css
                'dist/js/**/*.js',          // Optimized into main.js
                'dist/lib/**/*.js',         // Optimized into main.js
                'dist/web.config'           // Not used
            ]
        },

        // Configuration options for the server task
        server: {
        },

        // Configuration options for the watch task
        watch: {
            files: '<config:lint.files>',
            tasks: 'lint qunit'
        },

        // Global jshint options
        jshint: {
            options: {
                // See: http://www.jshint.com/docs/

                // Restrict options
                bitwise: true,          // Prohibit bitwise operators | and &
                camelcase: true,        // Require all variables to use camelCase or UPPER_CASE
                curly: true,            // Require curly braces for loop and conditional bodies
                eqeqeq: true,           // Prohibit == and !=
                forin: true,            // Require for/in loops to use hasOwnProperty
                immed: true,            // Require parenthesis around IIFEs
                indent: 4,              // Require 4 space indent
                latedef: true,          // Require variable declarations to be at the top of the function
                //maxparams: 5,           // Max number of formal parameters allowed for functions
                //maxdepth: 4,            // Max nesting level of code blocks
                //maxstatements: 10,      // Max number of statements allowed per function
                //maxcomplexity: 1,       // Max cyclomatic complexity value
                //maxlen: 140,            // Max line length of code
                newcap: true,           // Require capital letter on constructor functions
                noarg: true,            // Prohibit use of arguments.caller and arguments.callee
                noempty: true,          // Prohibit empty code blocks
                nonew: true,            // Prohibit use of new CtorFunc without assigning result to a variable
                plusplus: true,         // Prohibit use of ++ and -- operators
                //quotmark: true,         // Try to get consistency on use of single vs. double quotation marks
                //regexp: true,           // Prohibit use of unsafe . in regular expressions
                strict: true,           // Require all functions to have "use strict"
                trailing: true,         // Prohibit trailing spaces in javascript code
                undef: true,            // Prohibit use of explicitly undeclared local variables
                //unused: true,           // Warn when you define variables that are not used, and unused globals

                // Allow options
                //asi: true,              // Allow missing semicolons
                //boss: true,             // Allow assignments where comparisons are expected
                //debug: true,            // Allow debugger statements
                //eqnull: true,           // Allow using "== null"
                //es5: true,              // Allow ES 5 features which are not well-supported
                //esnext: true,           // Allow ES future features which are not well-supported or finalized
                //evil: true,             // Allow use of eval
                //expr: true,             // Allow expressions where an assignment or function call would normally be
                //funcscope: true,        // Allow use of variables outside scope of declaration
                //globalstrict: true,     // Allow use of global strict
                //iterator: true,         // Allow use of __iterator__ property
                //lastsemic: true,        // Allow missing semicolons, but on if it's the last semicolon in a one-line block
                //laxbreak: true,         // Allow unsafe line-endings
                //laxcomma: true,         // Allow comma-first coding style
                //loopfunc: true,         // Allow functions inside a loop
                //multistr: true,         // Allow multi-line strings with \ escaped line ending
                //onecase: true,          // Allow switches with one case
                //proto: true,            // Allow use of __proto__ property
                //regexdash: true,        // Allow use of unescaped - as end of regex
                //scripturl: true,        // Allow use of script targeted tags, like javascript:...
                //smarttabs: true,        // Allow use of mixed tabs and spaces
                //shadow: true,           // Allow var shadowing (declaring a variable that has already been declared in an outer scope)
                //sub: true,              // Allow use of [] notation for properties that can be expressed in .name notation
                //supernew: true,         // Allow use of "weird" constructors, like anonymous: "new function()"
                //validthis: true,        // Allow possible strict violations when using this in a non-constructor function

                // Assumed environments/globals
                browser: true,          // web browsers
                //couch: true,            // CouchDB
                devel: true,            // console/alert/etc
                //dojo: true,             // Dojo
                jquery: true,           // jQuery
                //mootools: true,         // Mootools
                //node: true,             // Node
                //nonstandard: true,      // escape/unescape
                //prototypejs: true,      // Prototype
                //rhino: true,            // Rhino
                //worker: true,           // Web Worker
                //wsh: true,              // Windows Script Host
                //yui: true,              // YUI

                // Legacy
                nomen: false,           // Disallow dangling _'s on variable names
                onevar: true,           // Allow only one var at the top of a function
                passfail: false,        // Stop at first error/warning
                white: false            // Check code against Crockford's style
            },
            globals: {
                define: true
            }
        }
    });

    // Default task.
    grunt.registerTask('default', 'less lint qunit requirejs rm:dist');
};
