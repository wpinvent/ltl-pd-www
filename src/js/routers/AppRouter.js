/*global define*/

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
                 * AppRouter initializer
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
                    'viewItem/:type/:id': 'viewItem',
                    'editItem/:type/:nodeType/:id': 'editItem',
                    'deleteItem/:type/:nodeType/:id': 'deleteItem',
                    'addImageToItem/:type/:nodeType/:id': 'addImageToItem',
                    'addSignatureToItem/:type/:nodeType/:id': 'addSignatureToItem',
                    'addNoteToItem/:type/:nodeType/:id': 'addNoteToItem',
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
