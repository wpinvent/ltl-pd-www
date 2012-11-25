/*global console,define */

(function() {
    'use strict';

    /**
     * Returns a constructor function for AppController
     * (Note: this is not the typical definition of a controller - it's more of just a utility class.
     * See Marionette AppRouter/Controller docs.)
     */
    define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'js/views/LoginView',
        'js/views/AboutView',
        'js/views/BoxesView'
        ],

        function(
            $,
            _,
            Backbone,
            Marionette,
            LoginView,
            AboutView,
            BoxesView
        ) {
            console.log('Entering js/controller/AppController');

            /**
             * Constructor function for AppController
             * Caller needs to set the "app" property on this object before use.
             */
            var AppController = function() {
                var self = this;

                self.index = function() {
                    console.log("AppController: Entering index function (no-op)");
                };

                self.login = function() {
                    console.log("AppController: Entering login function");
                    self.app.rootRegion.show(new LoginView());
                };

                self.about = function() {
                    console.log("AppController: Entering about function");
                    self.app.rootRegion.show(new AboutView());
                };

                self.boxes = function() {
                    console.log("AppController: Entering boxes function");
                    self.app.rootRegion.show(new BoxesView());
                };

                self.other = function(path) {
                    console.log("AppController: Entering other function");
                    console.log("Unknown route: " + path);
                };
            };

            return AppController;
        }
    );
}());
