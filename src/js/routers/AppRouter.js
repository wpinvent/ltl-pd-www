/*global console, define*/

(function() {
    'use strict';

    /**
     * Returns a constructor function for AppRouter
     */
    define(['jquery', 'underscore', 'backbone', 'marionette', 'marionetteAsync'],

        function($, _, Backbone, Marionette) {

            console.log('Entering js/routers/AppRouter');

            /**
             * AppRouter constructor function
             * Caller needs to set the controller property on this before it will work.
             */
            var AppRouter = Marionette.AppRouter.extend({

                /**
                 * Initializer
                 */
                initialize: function() {
                    _.bindAll(this);
                },

                /**
                 * Mapping of URL routes to controller functions
                 */
                appRoutes: {
                    '': 'index',
                    'login': 'login',
                    'about': 'about',
                    'boxes': 'boxes',
                    'view/:type/:nodeType/:id': 'view',
                    'edit/:type/:nodeType/:id': 'edit',
                    'delete/:type/:nodeType/:id': 'delete',
                    'addImage/:type/:nodeType/:id': 'addImage',
                    'addSignature/:type/:nodeType/:id': 'addSignature',
                    'addNote/:type/:nodeType/:id': 'addNote',
                    '*other': 'other'
                },

                /**
                 * Convenience function to navigate to a new route (and trigger the controller function)
                 */
                triggerRoute: function(route) {
                    this.navigate(route, { trigger: true });
                }
            });

            return AppRouter;
        }
    );
}());