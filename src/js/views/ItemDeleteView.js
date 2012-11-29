/*global define*/
(function() {
    'use strict';

    /**
     * ItemDeleteView
     */
    define(['jquery', 'underscore', 'backbone', 'marionette', 'marionetteAsync'],
        function($, _, Backbone, Marionette) {

            var ItemDeleteView = Marionette.ItemView.extend({

                viewName: 'ItemDeleteView',

                initialize: function(options) {

                }
            });

            return ItemDeleteView;
        }
    );
}());
