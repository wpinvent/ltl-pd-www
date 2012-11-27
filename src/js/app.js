/*global alert, console, define*/

(function() {
    'use strict';

    /**
     * app - Returns the main Backbone.Marionette.Application instance
     */
    define(['jquery', 'underscore', 'backbone', 'marionette', 'marionetteAsync'],

        function($, _, Backbone, Marionette) {
            console.log("Entering js/app");

            var app = new Marionette.Application();

            app.root = 'login';

            app.addRegions({
                rootRegion: '#root'
            });

            app.on('initialize:after', function() {
                console.log("Entering app initialize:after function");

                console.log("Starting Backbone history!");

                Backbone.history.start({
                    pushState: false
                });
            });

            return app;
        }
    );
}());
