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
        'js/views/BoxesView',
        'marionetteAsync'
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
            console.log('Entering js/controllers/AppController');

            /**
             * Constructor function for AppController
             * Caller needs to set the "app" property on this object before use.
             */
            var AppController = function() {
                var self = this;

                /**
                 * Shows a view
                 */
                self.showView = function(view) {
                    self.app.rootRegion.show(view);
                };

                /**
                 * Triggers a route via the router
                 */
                self.triggerRoute = function(route) {
                    self.app.router.triggerRoute(self.app.root);
                };

                self.index = function() {
                    console.log("AppController: Entering index function - triggerRoute -> " + self.app.root);
                    self.triggerRoute(self.app.root);
                };

                self.login = function() {
                    console.log("AppController: Entering login function");
                    self.showView(new LoginView());
                };

                self.about = function() {
                    console.log("AppController: Entering about function");
                    self.showView(new AboutView());
                };

                self.boxes = function() {
                    console.log("AppController: Entering boxes function");
                    self.showView(new BoxesView());
                };

                self.view = function(type, nodeType, id) {
                    //var view = self.app.viewFactory.createView
                    alert("Showing Detail View: " + id);
                };

                self.edit = function(type, nodeType, id) {
                    alert("Showing Edit View: " + id);
                };

                self['delete'] = function(type, nodeType, id) {
                    alert("Showing Delete View: " + id);
                };

                self.addImage = function(type, nodeType, id) {
                    alert("Showing Add Image View: " + id);
                };

                self.addSignature = function(type, nodeType, id) {
                    alert("Showing Add Signature View: " + id);
                };

                self.addNote = function(type, nodeType, id) {
                    alert("Showing Add Note View: " + id);
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
