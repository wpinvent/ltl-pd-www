/*global console, cordova, define, document, navigator, require, setTimeout */

(function() {
    'use strict';

    console.log('Entering main');

    /**
     * Sets up require.js, and defines the main entry point into the application (js/main)
     */
    require.config({

        // Paths to common dependencies
        // If you change these, you also have to change them in the build/build.r.js file.
        paths: {
            // Require.js plugins
            text: 'lib/require-2.1.1/text',
            domReady: 'lib/require-2.1.1/domReady',
            i18n: 'lib/require-2.1.1/i18n',
            tpl: 'lib/require-2.1.1/tpl',

            // jQuery
            jquery: 'lib/jquery-1.8.2/jquery',

            // Underscore
            // Use lodash rather than underscore for AMD support
            //underscore: 'lib/underscore-1.4.2/underscore',
            underscore: 'lib/lodash-0.10.0/lodash',

            // Backbone
            // Use AMD-enabled version of Backbone from github.com/amdjs/backbone
            //backbone: 'lib/backbone-0.9.2/backbone',
            backbone: 'lib/backbone-0.9.2/backbone-AMD',

            // Backbone.Marionette
            // Has AMD support built-in (doesn't need to be shimmed)
            marionette: 'lib/backbone.marionette-1.0.0-beta5-AMD/backbone.marionette',

            // Backbone.BackStack
            backstack: 'lib/backstack-1.1.2/backstack',

            // Twitter Bootstrap JavaScript
            bootstrap: 'lib/twitter-bootstrap-2.2.1/js/bootstrap'
        },

        // Shim in dependencies that are not AMD-compliant
        shim: {
            bootstrap: {
                deps: ['jquery'],
                exports: 'bootstrap'
            }
        }
    });

    /**
     * Main entry point into the application
     */
    require(['domReady', 'jquery', 'underscore', 'backbone', 'js/app', 'js/routers/appRouter', 'bootstrap'],
        function (domReady, $, _, Backbone, app, appRouter) {

            console.log('Entering js/main');

            // Wait for DOM ready...
            domReady(function () {

                console.log('DOM ready!');

                // Function to run when Cordova is ready
                var onDeviceReady = function(isDesktop) {

                    console.log('Device ready!');

                    if (isDesktop !== true) {
                        cordova.exec(null, null, 'SplashScreen', 'hide', []);
                    }

                    app.start({
                        isDesktop: isDesktop,
                        router: appRouter
                    });

                    // Hide the static loading div
                    $('#loading').slideUp(600);
                    //$('#loading').hide();
                };

                // Setup listener for Cordova deviceready...
                if (navigator.userAgent.match(/(iPad|iPhone|Android)/)) {
                    // Device - must wait for deviceready
                    document.addEventListener('deviceready', function() {
                        onDeviceReady(false);
                    }, false);
                } else {
                    // Desktop - deviceready is N/A, just apply a simulated loading delay
                    setTimeout(function() {
                        onDeviceReady(true);
                    }, 500);
                }
            });
        }
    );
}());
