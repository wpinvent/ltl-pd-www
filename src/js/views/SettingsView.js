/*global define*/
(function() {
    'use strict';

    define(['jquery', 'underscore', 'backbone', 'marionette', 'marionetteAsync'],
        function($, _, Backbone, Marionette) {

            var SettingsView = Marionette.ItemView.extend({

                viewName: 'SettingsView',

                initialize: function(options) {

                }
            });

            return SettingsView;
        }
    );

}());
