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
        'js/views/ViewFactory',
        'js/utils/backboneConfig',
        'js/utils/marionetteConfig'
        ],

        function(
            $,
            _,
            Backbone,
            Marionette,
            CordovaNative,
            DesktopNative,
            ViewFactory
        ) {

            console.log("Entering js/app");

            var app = new Marionette.Application();

            app.root = 'login';

            app.addRegions({
                mainRegion: '#root'
            });

            app.initializeRouter = function(options) {
                console.log("Initializing router...");

                app.router = options.router;
            };

            app.initializeNative = function(options) {
                console.log("Initializing native...");

                if (options.isDesktop === true) {
                    console.log('Using DesktopNative');
                    app.native = new DesktopNative();
                } else {
                    console.log('Using CordovaNative');
                    app.native = new CordovaNative();
                }
            };

            app.initializeEventAggregator = function(options) {
                console.log("Initializing event aggregator...");
            };

            app.initializeAppSchema = function(options) {
                console.log('Initializing app schema...');

                // TODO: switch to native call with deferred/promise???
                $.ajax({
                    url: 'data/appSchema.json',
                    dataType: 'json'
                })
                .done(function(data) {
                    console.log("Got appSchema: " + data);
                    app.schema = data;
                })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    console.log("Failed to get app schema: " + textStatus);
                });
            };

            app.initializeAppDescriptor = function(options) {
                console.log('Initializing app descriptor...');

                var afterGetAppDescriptor = _.after(1, function() {
                    app.descriptor = data;
                });

                // TODO: switch to native call with deferred/promise???
                $.ajax({
                    url: 'data/appDescriptor.json',
                    dataType: 'json'
                })
                .done(function(data) {
                    console.log("Got appDescriptor: " + data);
                    app.descriptor = data;
                })
                .fail(function(jqXHR, textStatus, errorThrown) {
                    console.log("Failed to get app descriptor: " + textStatus);
                });
            };

            app.initializeViewFactory = function(options) {
                app.viewFactory = new ViewFactory();
                app.viewFactory.initialize(app);
            };

            app.addInitializer(app.initializeRouter);
            app.addInitializer(app.initializeNative);
            app.addInitializer(app.initializeEventAggregator);
            app.addInitializer(app.initializeAppSchema);
            app.addInitializer(app.initializeAppDescriptor);
            app.addInitializer(app.initializeViewFactory);

            app.on('initialize:after', function() {
                console.log("Entering app initialize:after function");

                console.log("Starting Backbone history!");

                Backbone.history.start({
                    pushState: false
                    // Apparently, setting root here doesn't work when not using pushState (i.e. it doesn't trigger the root route)
                });

                app.router.triggerRoute('login');
            });

            return app;
        }
    );
}());
