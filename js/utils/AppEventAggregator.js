(function() {
    'use strict';

    define(['jquery', 'underscore', 'backbone', 'marionette'],
        function( $, _, Backbone, Marionette) {

            var AppEventAggregator = Marionette.EventAggregator.extend({

            });

            return AppEventAggregator;
        }
    );
}());
