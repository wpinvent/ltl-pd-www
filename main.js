/*global console, cordova, define, document, navigator, require, setTimeout */

(function() {
    'use strict';

    console.log('Entering main');

    /**
     * Sets up require.js, and defines the main entry point into the application (js/main)
     */
    require.config({

        /**
         * Paths to common dependencies
         * NOTE: If you change these, you also have to change them in the build/build.r.js file.
         */
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
            marionetteAsync: 'lib/backbone.marionette.async-0.2.0-AMD/backbone.marionette.async',

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
    require([
        'domReady',
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'js/controllers/AppController',
        'js/routers/AppRouter',
        'js/utils/DesktopNative',
        'js/utils/CordovaNative',
        'js/views/ViewFactory',
        'js/app',
        'js/utils/jqueryConfig',
        'js/utils/underscoreConfig',
        'js/utils/backboneConfig',
        'js/utils/marionetteConfig',
        'marionetteAsync', // No export - modifies existing Marionette stuff
        'bootstrap' // No export needed at this time
        ],
        function (
            domReady,
            $,
            _,
            Backbone,
            Marionette,
            AppController,
            AppRouter,
            DesktopNative,
            CordovaNative,
            ViewFactory,
            app,
            jqueryConfig,
            underscoreConfig,
            backboneConfig,
            marionetteConfig
        ) {
            var onDeviceReady,
                initAppController,
                initAppRouter,
                initNative,
                initEventAggregator,
                initAppSchema,
                initAppDescriptor,
                initViewFactory,
                preStartApp,
                startApp,
                postStartApp;

            console.log('Entering js/main');

            onDeviceReady = function(isDesktop) {
                var options;

                console.log('Device ready!');

                options = { isDesktop: isDesktop };

                preStartApp(options);
                startApp(options);
                postStartApp(options);
            };

            initAppController = function(options) {
                var deferred = new $.Deferred();

                console.log("Initializing AppController...");
                options.controller = new AppController();

                console.log("Done Initializing AppController...");
                deferred.resolve();

                return deferred;
            };

            initAppRouter = function(options) {
                var deferred = new $.Deferred();

                console.log('Initializing AppRouter...');
                options.router = new AppRouter({ controller: options.controller });

                console.log('Done initializing AppRouter.');
                deferred.resolve();

                return deferred;
            };

            initNative = function(options) {
                var deferred = new $.Deferred();

                console.log("Initializing native...");

                if (options.isDesktop) {
                    options.native = new DesktopNative();
                } else {
                    options.native = new CordovaNative();
                }

                console.log("Done initializing native.");
                deferred.resolve();

                return deferred;
            };

            initEventAggregator = function(options) {
                var deferred = new $.Deferred();

                console.log("Initializing EventAggregator...");
                options.vent = new Marionette.EventAggregator();

                console.log("Done initializing EventAggregator.");
                deferred.resolve();

                return deferred;
            };

            initAppSchema = function(options) {

                var deferred = new $.Deferred();

                console.log("Initializing AppSchema (using native)...");

                options.native.getAppSchema()
                    .done(function(data) {
                        console.log("Done initializing AppSchema (using native).");
                        console.log(data);
                        options.schema = data;
                        deferred.resolve();
                    })
                    .fail(function(error) {
                        console.log("Failed initializing AppSchema (using native).");
                        console.log(error);
                        deferred.reject();
                    });

                return deferred;
            }

            initAppDescriptor = function(options) {
                var deferred = new $.Deferred();

                console.log("Initializing AppDescriptor (using native)...");

                options.native.getAppSchema()
                    .done(function(data) {
                        console.log("Done initializing AppDescriptor (using native).");
                        console.log(data);
                        options.descriptor = data;
                        deferred.resolve();
                    })
                    .fail(function(error) {
                        console.log("Failed initializing AppDescriptor (using native).");
                        console.log(error);
                        deferred.reject();
                    });

                return deferred;
            };

            initViewFactory = function(options) {
                var deferred = new $.Deferred();

                console.log("Initializing viewFactory...");
                options.viewFactory = new ViewFactory();

                console.log("Done initialzing viewFactory.");
                deferred.resolve();

                return deferred;
            };

            initializeJQuery = function(options) {
                jqueryConfig.initialize(app);
            };

            initializeUnderscore = function(options) {
                underscoreConfig.initialize(app);
            };

            initializeBackbone = function(options) {
                backboneConfig.initialize(app);
            };

            initializeMarionette = function(options) {
                marionetteConfig.initialize(app);
            };

            preStartApp = function(options) {
                // Hide the Cordova splash screen.  Not sure if this is really needed.
                if (options.isDesktop !== true) {
                    cordova.exec(null, null, 'SplashScreen', 'hide', []);
                }
            };

            startApp = function(options) {

                console.log("Loading application using async init tasks...");

                // Pre-load a bunch of stuff (using jQuery Deferreds) before starting the Marionette Application.
                // This is done this way because the Applicationi addInitializer/etc. support does not
                // seem to provide an async initialization mechanism that can wait for async tasks
                // to finish before proceeding.  Note that some of these are not actually async, but we're using
                // Deferred anyway, so they work nicely with the $.when function.
                //
                // TODO: later tasks may be dependent on earlier tasks (e.g. initAppSchema depends on initNative).
                // May need to split this init chained whens if things get processed out of order.
                $.when(
                    initAppController(options),
                    initAppRouter(options),
                    initNative(options),
                    initEventAggregator(options),
                    initAppSchema(options),
                    initAppDescriptor(options),
                    initViewFactory(options)
                )
                .done(function() {
                    console.log("Async init tasks complete!  Starting application...");
                    app.start(options);
                })
                .fail(function() {
                    console.log("Failed to initialize application.");
                })
                .always(function() {
                    console.log("Done loading application using async init tasks.");
                });
            };

            postStartApp = function(options) {
                $('#loading').slideUp(600);
            };

            // Wait for DOM ready...
            domReady(function () {

                console.log('DOM ready!');

                if (navigator.userAgent.match(/(iPad|iPhone|Android)/)) {

                    // Running on device, wait for Cordova's deviceready to proceed
                    document.addEventListener('deviceready', function() {
                        onDeviceReady(false);
                    }, false);

                } else {

                    // Running on desktop (browser with no Cordova), proceed after simulated delay
                    setTimeout(function() {
                        onDeviceReady(true);
                    }, 500);

                }
            });
        }
    );

}());
