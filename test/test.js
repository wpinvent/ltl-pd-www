/*global define, require*/
(function() {
    'use strict';

    require.config({
        paths: {
            // Require.js plugins
            text: '../src/lib/require-2.1.1/text',
            domReady: '../src/lib/require-2.1.1/domReady',
            i18n: '../src/lib/require-2.1.1/i18n',
            tpl: '../src/lib/require-2.1.1/tpl',

            // jQuery
            jquery: '../src/lib/jquery-1.8.2/jquery',

            // Underscore
            // Use lodash rather than underscore for AMD support
            //underscore: 'lib/underscore-1.4.2/underscore',
            underscore: '../src/lib/lodash-0.10.0/lodash',

            // Backbone
            // Use AMD-enabled version of Backbone from github.com/amdjs/backbone
            //backbone: 'lib/backbone-0.9.2/backbone',
            backbone: '../src/lib/backbone-0.9.2/backbone-AMD',

            // Backbone.Marionette
            // Has AMD support built-in (doesn't need to be shimmed)
            marionette: '../src/lib/backbone.marionette-1.0.0-beta5-AMD/backbone.marionette',
            marionetteAsync: '../src/lib/backbone.marionette.async-0.2.0-AMD/backbone.marionette.async',

            // Backbone.BackStack
            backstack: '../src/lib/backstack-1.1.2/backstack',

            // Twitter Bootstrap JavaScript
            bootstrap: '../src/lib/twitter-bootstrap-2.2.1/js/bootstrap',

            // Jasmine
            jasmine: 'lib/jasmine-1.3.0/jasmine',
            'jasmine-html': 'lib/jasmine-1.3.0/jasmine-html'
        },

        // Shim in dependencies that are not AMD-compliant
        shim: {
            bootstrap: {
                deps: ['jquery'],
                exports: 'bootstrap'
            },
            jasmine: {
                exports: 'jasmine'
            },
            'jasmine-html': {
                deps: ['jasmine'],
                exports: 'jasmine'
            }
        }
    });


    require([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'jasmine-html',
        'marionetteAsync'
        ],
        function($, _, Backbone, Marionette, jasmine) {

            var jasmineEnv = jasmine.getEnv(),
                htmlReporter = new jasmine.HtmlReporter(),
                specs = [];

            jasmineEnv.updateInterval = 1000;
            jasmineEnv.addReporter(htmlReporter);
            jasmineEnv.specFilter = function(spec) {
                return htmlReporter.specFilter(spec);
            };

            specs.push('js/models/SessionSpec');

            $(function() {
                require(specs, function() {
                    jasmineEnv.execute();
                });
            });
        }
    );

}());
