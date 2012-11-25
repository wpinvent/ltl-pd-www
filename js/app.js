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
        'marionette'
        ],

        function(
            $,
            _,
            Backbone,
            Marionette
        ) {
            console.log("Entering js/app");

            var app = new Marionette.Application();

            app.root = 'login';

            app.addRegions({
                rootRegion: '#root'
            });

            app.initializeAppController = function(options) {
                app.controller = options.controller;
                app.controller.app = app;
            };

            app.initializeAppRouter = function(options) {
                app.router = options.router;
                //app.router.controller = app.controller;
                app.router.app = app;
            };

            app.initializeNative = function(options) {
                app.native = options.native;
                app.native.app = app;
            };

            app.initializeEventAggregator = function(options) {
                app.vent = options.vent;
                app.vent.app = app;
            };

            app.initializeAppSchema = function(options) {
                app.schema = options.appSchema;
            };

            app.initializeAppDescriptor = function(options) {
                app.descriptor = options.appDescriptor;
            };

            app.initializeViewFactory = function(options) {
                app.viewFactory = options.viewFactory;
                app.viewFactory.app = app;
            };

            app.addInitializer(app.initializeAppController);
            app.addInitializer(app.initializeAppRouter);
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
