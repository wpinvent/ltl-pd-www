/*global alert, console, define */
(function() {
    'use strict';

    define(['jquery', 'underscore', 'backbone', 'marionette'],
        function($, _, Backbone, Marionette) {

            var ItemCollectionItemView = Marionette.ItemView.extend({

                initialize: function(options) {
                    console.log('Entering ItemCollectionItemView initialize: ' + options);
                    _.bindAll(this);

                    this.type = options.type;
                }
            });

            return ItemCollectionItemView;
        }
    );

}());
