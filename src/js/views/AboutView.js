/*global console, define*/

(function() {
    'use strict';

    /**
     * AboutView
     */
    define(['jquery', 'underscore', 'backbone', 'marionette', 'marionetteAsync'],

        function($, _, Backbone, Marionette) {
            console.log('Entering js/views/AboutView');

            var AboutView = Marionette.ItemView.extend({

                initialize: function() {
                    _.bindAll(this);
                }
            });

            return AboutView;
        }
    );

}());
