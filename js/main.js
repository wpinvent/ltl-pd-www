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
            };

            // Setup listener for Cordova deviceready...
            if (navigator.userAgent.match(/(iPad|iPhone|Android)/)) {
                // Device - must wait for deviceready
                document.addEventListener('deviceready', function() {
                    onDeviceReady(false)
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
