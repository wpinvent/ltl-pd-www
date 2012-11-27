/*global alert, console, define*/
(function() {
    'use strict';

    define(['jquery', 'underscore', 'backbone', 'marionette', 'marionetteAsync'],
        function( $, _, Backbone, Marionette) {

            var AppEventAggregator = Marionette.EventAggregator.extend({
                // TODO: Put convenience methods here...
            });

            return AppEventAggregator;
        }
    );
}());
