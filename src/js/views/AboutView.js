/*global console, define*/

(function() {
    'use strict';

    /**
     * AboutView
     */
    define(['jquery', 'underscore', 'backbone', 'marionette', 'js/app', 'marionetteAsync'],

        function($, _, Backbone, Marionette, app) {
            console.log('Entering js/views/AboutView');

            var AboutView = Marionette.ItemView.extend({

                template: 'AboutView',

                initialize: function() {
                    _.bindAll(this);
                }
            });

            return AboutView;
        }
    );

}());