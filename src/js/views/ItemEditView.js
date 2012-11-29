/*global define*/
(function() {
    'use strict';

    define(['jquery', 'underscore', 'backbone', 'marionette', 'marionetteAsync'],
        function($, _, Backbone, Marionette) {

            var ItemEditView = Marionette.ItemView.extend({

                viewName: 'ItemEditView',

                initialize: function(options) {

                }
            });

            return ItemEditView;
        }
    );
}());
