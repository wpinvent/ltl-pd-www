/*global define */
(function() {
    'use strict';

    define(['jquery', 'underscore', 'backbone', 'marionette', 'marionetteAsync'],
        function($, _, Backbone, Marionette) {

            var ItemCollectionItemView = Marionette.ItemView.extend({

                viewName: 'ItemCollectionItemView',

                initialize: function(options) {
                    _.bindAll(this);
                }
            });

            return ItemCollectionItemView;
        }
    );
}());
