/*global console, define*/

(function() {
    'use strict';

    /**
     * Returns the main Backbone.Marionette.AppRouter instance
     */
    define(['jquery', 'underscore', 'backbone', 'marionette', 'js/controllers/appController'],

        function($, _, Backbone, Marionette, appController) {

            console.log('Entering js/routers/appRouter');

            var AppRouter = Marionette.AppRouter.extend({

                initialize: function() {
                    _.bindAll(this);
                },

                appRoutes: {
                    '': 'index',
                    'login': 'login',
                    'about': 'about',
                    'boxes': 'boxes',
                    '*other': 'other'
                },

                triggerRoute: function(route) {
                    this.navigate(route, { trigger: true });
                }
            });

            return new AppRouter({
                controller: appController
            });
        }
    );
}());
