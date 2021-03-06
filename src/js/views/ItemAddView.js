/*global define*/
(function() {
    'use strict';

    define(['jquery', 'underscore', 'backbone', 'marionette', 'marionetteAsync'],
        function($, _, Backbone, Marionette) {

            var ItemAddView = Marionette.ItemView.extend({

                viewName: 'ItemAddView',

                initialize: function(options) {
                    _.bindAll(this);
                }
            });

            return ItemAddView;
        }
    );
}());
