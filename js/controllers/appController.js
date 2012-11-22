/*global console,define */

(function() {
    'use strict';

    /**
     * Returns the main controller instance for the application
     * (Note: this is not the typical definition of a controller - see Marionette AppRouter/Controller docs.)
     */
    define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'backstack',
        'js/app',
        'js/views/LoginView',
        'js/views/AboutView',
        'js/views/BoxesView'
        ],

        function(
            $,
            _,
            Backbone,
            Marionette,
            BackStack,
            app,
            LoginView,
            AboutView,
            BoxesView
        ) {
            console.log('Entering js/appController');

            /**
             * Constructor function for AppController
             */
            var AppController = function() {
                var self = this;
                    //stackNavigator = new BackStack.StackNavigator({el: '#container'});

                self.index = function() {
                    console.log("Entering index function");
                    //app.router.triggerRoute('login'});
                };

                self.login = function() {
                    console.log("Entering login function");
                    app.mainRegion.show(new LoginView());
                    //stackNavigator.pushView(new LoginView());
                };

                self.about = function() {
                    console.log("Entering about function");
                    app.mainRegion.show(new AboutView());
                    //stackNavigator.pushView(new AboutView());
                };

                self.boxes = function() {
                    console.log("Entering boxes function");
                    app.mainRegion.show(new BoxesView());
                    //stackNavigator.pushView(new BoxesView());
                };

                self.other = function(path) {
                    console.log("Entering other function");
                    console.log("Invalid route: " + path);
                };
            };

            return new AppController();
        }
    );
}());
