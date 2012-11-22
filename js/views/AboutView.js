/*global console, define*/

(function() {
    'use strict';

    /**
     * AboutView
     */
    define(['jquery', 'underscore', 'backbone', 'marionette', 'js/app', 'tpl!html/AboutView.html'],

        function($, _, Backbone, Marionette, app, template) {
            console.log('Entering js/views/AboutView');

            var AboutView = Marionette.ItemView.extend({

                initialize: function() {
                    _.bindAll(this);
                },

                template: template
            });

            return AboutView;
        }
    );

}());
