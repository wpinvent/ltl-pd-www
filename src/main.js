/*global cordova, define, require*/

(function() {
    'use strict';

    console.log('Entering main (require.config)');

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
        'js/utils/AppEventAggregator',
        'js/views/ViewFactory',
        'js/app',
        'js/utils/jqueryConfig',
        'js/utils/underscoreConfig',
        'js/utils/backboneConfig',
        'js/utils/marionetteConfig',
        'marionetteAsync', // No export (modifies existing Marionette stuff), but add here to execute module
        'bootstrap' // No export needed at this time, but add here to execute module
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
            AppEventAggregator,
            ViewFactory,
            app,
            jqueryConfig,
            underscoreConfig,
            backboneConfig,
            marionetteConfig
        ) {
            console.log('Entering main');

                /**
                 * Initializes the Marionette AppController
                 */
            var initializeAppController = function() {
                    var deferred = new $.Deferred();

                    console.log("Initializing AppController...");
                    app.controller = new AppController();
                    app.controller.app = app;

                    console.log("Done Initializing AppController...");
                    deferred.resolve();

                    return deferred;
                },

                /**
                 * Initializes the Marionette AppRouter with the AppController
                 */
                initializeAppRouter = function() {
                    var deferred = new $.Deferred();

                    console.log('Initializing AppRouter...');
                    app.router = new AppRouter({ controller: app.controller });
                    app.router.app = app;

                    console.log('Done initializing AppRouter.');
                    deferred.resolve();

                    return deferred;
                },

                /**
                 * Initializes the "native" wrapper object
                 */
                initializeNative = function() {
                    var deferred = new $.Deferred();

                    console.log("Initializing native...");

                    if (app.isDesktop) {
                        app.native = new DesktopNative();
                    } else {
                        app.native = new CordovaNative();
                    }

                    console.log("Done initializing native.");
                    deferred.resolve();

                    return deferred;
                },

                /**
                 * Initializes a Marionette EventAggregator instance
                 */
                initializeEventAggregator = function() {
                    var deferred = new $.Deferred();

                    console.log("Initializing EventAggregator...");
                    app.vent = new AppEventAggregator();
                    app.vent.app = app;

                    console.log("Done initializing EventAggregator.");
                    deferred.resolve();

                    return deferred;
                },

                /**
                 * Initializes the appSchema object (using native call)
                 */
                initializeAppSchema = function() {

                    var deferred = new $.Deferred();

                    console.log("Initializing AppSchema (using native)...");

                    app.native.getAppSchema()
                        .done(function(data) {
                            console.log("Done initializing AppSchema (using native).");
                            console.log(data);
                            app.schema = data;
                            deferred.resolve();
                        })
                        .fail(function(error) {
                            console.log("Failed initializing AppSchema (using native).");
                            console.log(error);
                            deferred.reject();
                        });

                    return deferred;
                },

                /**
                 * Initializes the app descriptor object (using native)
                 */
                initializeAppDescriptor = function() {
                    var deferred = new $.Deferred();

                    console.log("Initializing AppDescriptor (using native)...");

                    app.native.getAppDescriptor()
                        .done(function(data) {
                            console.log("Done initializing AppDescriptor (using native).");
                            console.log(data);
                            app.descriptor = data;
                            deferred.resolve();
                        })
                        .fail(function(error) {
                            console.log("Failed initializing AppDescriptor (using native).");
                            console.log(error);
                            deferred.reject();
                        });

                    return deferred;
                },

                /**
                 * Initializes the generic ViewFactory
                 */
                initializeViewFactory = function() {
                    var deferred = new $.Deferred();

                    console.log("Initializing viewFactory...");
                    app.viewFactory = new ViewFactory();
                    app.viewFactory.app = app;

                    console.log("Done initialzing viewFactory.");
                    deferred.resolve();

                    return deferred;
                },

                /**
                 * Initializes global jQuery settings
                 */
                initializeJQuery = function() {
                    var deferred = new $.Deferred();

                    console.log("Initializing jQuery...");
                    jqueryConfig.initialize(app);

                    console.log("Done initialzing jQuery.");
                    deferred.resolve();

                    return deferred;
                },

                /**
                 * Initializes global Underscore settings
                 */
                initializeUnderscore = function() {
                    var deferred = new $.Deferred();

                    console.log("Initializing Underscore...");
                    underscoreConfig.initialize(app);

                    console.log("Done initialzing Underscore.");
                    deferred.resolve();

                    return deferred;
                },

                /**
                 * Initializes global Backbone settings
                 */
                initializeBackbone = function() {
                    var deferred = new $.Deferred();

                    console.log("Initializing Backbone...");
                    backboneConfig.initialize(app);

                    console.log("Done initialzing Backbone.");
                    deferred.resolve();

                    return deferred;
                },

                /**
                 * Initializes global Marionette settings
                 */
                initializeMarionette = function() {
                    var deferred = new $.Deferred();

                    console.log("Initializing Marionette...");
                    marionetteConfig.initialize(app);

                    console.log("Done initialzing Marionette.");
                    deferred.resolve();

                    return deferred;
                },

                /**
                 * Function to call before startApp
                 */
                preStartApp = function() {
                    // Hide the Cordova splash screen.  Not sure if this is really needed.
                    if (app.isDesktop !== true) {
                        cordova.exec(null, null, 'SplashScreen', 'hide', []);
                    }
                },

                /**
                 * Initializes app dependencies and then starts the Marionette app instance
                 */
                startApp = function() {

                    console.log("Loading application using async initialize tasks...");

                    // Pre-load a bunch of stuff (using jQuery Deferreds) before starting the Marionette Application.
                    // This is done this way because the Marionette Application addInitializer/etc. stuff does not
                    // seem to provide an async initialization mechanism that can wait for async tasks
                    // to finish before proceeding.  Note that some of these are not actually async, but we're using
                    // Deferred anyway, so they work nicely with the $.when function.
                    //
                    // TODO: later tasks may be dependent on earlier tasks (e.g. initializeAppSchema depends on initializeNative).
                    // May need to split this initialize chained whens if things get processed out of order.
                    $.when(
                        initializeAppController(),
                        initializeAppRouter(),
                        initializeNative(),
                        initializeEventAggregator(),
                        initializeAppSchema(),
                        initializeAppDescriptor(),
                        initializeViewFactory(),
                        initializeJQuery(),
                        initializeUnderscore(),
                        initializeBackbone(),
                        initializeMarionette()
                    )
                    .done(function() {
                        console.log("Async initialize tasks complete!  Starting application...");
                        app.start();
                    })
                    .fail(function() {
                        console.log("Failed to initialize application.");
                    })
                    .always(function() {
                        console.log("Done loading application using async initialize tasks.");
                    });
                },

                /**
                 * Function to run after startApp
                 */
                postStartApp = function() {
                    $('#loading').slideUp(600);
                },

                /**
                 * Function to run when Cordova (or Desktop browser) is ready
                 */
                onDeviceReady = function(isDesktop) {
                    console.log('Device ready!');

                    app.isDesktop = isDesktop;

                    preStartApp();
                    startApp();
                    postStartApp();
                };

            // Application entry point: wait for DOM ready...
            domReady(function () {

                console.log('DOM ready!');

                console.log('User agent: ' + navigator.userAgent);

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
