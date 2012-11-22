/*global alert, console, define*/

(function() {
    'use strict';

    /**
     * app - Returns the main Backbone.Marionette.Application instance
     */
    define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'js/utils/CordovaNative',
        'js/utils/DesktopNative',
        'js/utils/backboneConfig',
        'js/utils/marionetteConfig'
        ],

        function(
            $,
            _,
            Backbone,
            Marionette,
            CordovaNative,
            DesktopNative
        ) {
            //'use strict';

            console.log("Entering js/app");

            /**
             * Creates an instance of a Backbone.Marionette.Application
             */
            var app = new Marionette.Application();

            /**
             * Defines the root URL path for the application
             */
            app.root = 'login';

            /**
             * Adds the UI regions to the app
             */
            app.addRegions({
                mainRegion: '#main'
            });

            /**
             * Called during application initialization
             */
            app.addInitializer(function(startOptions) {
                console.log("Entering app initializer");

                app.initRouter(startOptions);
                app.initNative(startOptions);
                app.initEvents(startOptions);
            });

            /**
             * Called after the the app is initialized
             */
            app.on('initialize:after', function() {
                console.log("Entering app initialize:after function");

                console.log("Starting Backbone history!");
                Backbone.history.start({
                    pushState: false
                    // Apparently, setting root here doesn't work when not using pushState (i.e. it doesn't trigger the root route)
                });

                app.router.triggerRoute('login');
            });

            /**
             * Initializes the application's layout
             */
            app.initRouter = function(startOptions) {
                console.log("Entering app.initRouter");

                app.router = startOptions.router;

                // This forces any link with role="nav-main" will navigate to the href via the main app.router
                // TODO: not sure why/if this is actually needed... got it off the wide world of webs...
                $('a[role=nav-main]').click(function(e) {
                    e.preventDefault();
                    app.router.triggerRoute($(this).attr('href'));
                });
            };

            /**
             * Initializes the native code async invocation wrapper
             */
            app.initNative = function(startOptions) {
                console.log("Entering app.initNative");

                if (startOptions.isDesktop === true) {
                    console.log('Using DesktopNative');
                    app.native = new DesktopNative();
                } else {
                    console.log('Using CordovaNative');
                    app.native = new CordovaNative();
                }
            };

            app.initEvents = function(startOptions) {
                app.vent.on('boxes:event', function(args) {
                    alert('Event Aggregator: ' + args);
                });
            };

            return app;
        }
    );
}());
