/**
 * Returns a contructor function for the AboutView
 */
define(['jquery', 'underscore', 'backbone', 'marionette', 'js/app', 'tpl!html/AboutView.html'],

    function($, _, Backbone, Marionette, app, template) {
        console.log('Entering js/views/AboutView');

        var AboutView = Marionette.ItemView.extend({
            template: template,
        });

        return AboutView;
    }
);