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
require(['domReady', 'jquery', 'bootstrap', 'js/views/HomeView'],

    function (domReady, $, bootstrap, HomeView) {

        // This is require.js's equivalent of jQuery's $(document).ready()...
        domReady(function () {

            // Function to run when Cordova is ready
            var onDeviceReady = function(desktop) {

                if (desktop !== true) {
                    cordova.exec(null, null, 'SplashScreen', 'hide', []);
                }

                // Start the application!
                var homeView = new HomeView().render();
                $('div#root').append(homeView.el);

                // Hide the static loading div
                $('#loading').slideUp(600);
            }

            // If running on a device, wait for Cordova's deviceready event
            if (navigator.userAgent.match(/(iPad|iPhone|Android)/)) {
                document.addEventListener('deviceready', onDeviceReady, false);
            }
            else {
                onDeviceReady(true);
            }
        });
    }
);
