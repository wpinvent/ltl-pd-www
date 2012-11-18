require.config({
    paths: {
        // Require.js plugins
        text: 'lib/require-2.1.1/text',
        domReady: 'lib/require-2.1.1/domReady',
        i18n: 'lib/require-2.1.1/i18n',

        // jQuery
        jquery: 'lib/jquery-1.8.2/jquery',

        // Underscore.js
        underscore: 'lib/underscore-1.4.2/underscore',

        // Backbone.js
        backbone: 'lib/backbone-0.9.2/backbone',

        // Twitter Bootstrap JavaScript
        bootstrap: 'lib/twitter-bootstrap-2.2.1/js/bootstrap'
    },

    shim: {
        jquery: {
            exports: '$'
        },

        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },

        underscore: {
            exports: '_'
        },

        bootstrap: {
            deps: ['jquery'],
            exports: 'bootstrap'
        }
    }
});

/**
 * Main entry point into the application
 */
require(['domReady', 'jquery', 'underscore', 'backbone', 'js/app', 'bootstrap'],
    // bootstrap not used directly, but included in deps list to force it to load

    function (domReady, $, _, Backbone, app) {

        console.log('Entering main');

        // This is require.js's equivalent of jQuery's $(document).ready()...
        domReady(function () {

            // Function to run when Cordova is ready
            var onDeviceReady = function(isDesktop) {
                if (isDesktop !== true) {
                    cordova.exec(null, null, 'SplashScreen', 'hide', []);
                }

                // Start the application!
                app.initialize(isDesktop);
                Backbone.history.start({ pushState: false }); // use hash-based URLs off of index.html
                app.start();

                // Hide the static loading div
                $('#loading').slideUp(600);
            };

            // If running on a device, wait for Cordova's deviceready event
            if (navigator.userAgent.match(/(iPad|iPhone|Android)/)) {
                document.addEventListener('deviceready', onDeviceReady, false);
            }
            else {
                // On desktop - simulated loading delay
                setTimeout(function() {
                    onDeviceReady(true);
                }, 500);
            }
        });
    }
);
