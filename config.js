console.log('Entering config');

/**
 * Sets up require.js, and defines the main entry point into the application (js/main)
 */
require.config({
    // Application main entry point (will be called once require is initialized...)
    deps: ['js/main'],

    // Paths to common dependencies
    paths: {
        // Require.js plugins
        text: 'lib/require-2.1.1/text',
        domReady: 'lib/require-2.1.1/domReady',
        i18n: 'lib/require-2.1.1/i18n',
        tpl: 'lib/require-2.1.1/tpl',

        // jQuery
        jquery: 'lib/jquery-1.8.2/jquery',

        // Underscore
        underscore: 'lib/underscore-1.4.2/underscore',

        // Backbone
        backbone: 'lib/backbone-0.9.2/backbone',

        // Backbone.Marionette
        // Has AMD support built-in (doesn't need to be shimmed)
        marionette: 'lib/backbone.marionette-1.0.0-beta5-AMD/backbone.marionette',

        // Twitter Bootstrap JavaScript
        bootstrap: 'lib/twitter-bootstrap-2.2.1/js/bootstrap'
    },

    // Shim in dependencies that are not AMD-compliant by default
    shim: {
        jquery: {
            exports: '$'
        },

        underscore: {
            exports: '_'
        },

        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },

        bootstrap: {
            deps: ['jquery'],
            exports: 'bootstrap'
        }
    }
});
