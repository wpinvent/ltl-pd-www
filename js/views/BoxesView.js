/**
 * Returns a contructor function for the BoxesView
 */
define(['jquery', 'underscore', 'backbone', 'marionette', 'js/app', 'tpl!html/BoxesView.html'],

    function($, _, Backbone, Marionette, app, template) {

        console.log('Entering js/views/BoxesView');

        var BoxesView = Marionette.ItemView.extend({

            template: template,

            initialize: function() {
                console.log("Entering LoginView initialize");

                _.bindAll(this);

                var test = app.session;
            },

            ui: {
            },

            events: {
                'click #event': 'onEventClick'
            },

            onEventClick: function() {
                app.vent.trigger('boxes:event', 'my param');
            }
        });

        return BoxesView;
    }
);
