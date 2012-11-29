/*global define*/
(function() {
    'use strict';

    define(['jquery', 'underscore', 'backbone', 'marionette', 'marionetteAsync'],
        function($, _, Backbone, Marionette) {

            var ItemDetailView = Marionette.Layout.extend({

                viewName: 'ItemDetailView',

                initialize: function(options) {
                    _.bindAll(this);
                }
            });

            return ItemDetailView;
        }
    );

}());
