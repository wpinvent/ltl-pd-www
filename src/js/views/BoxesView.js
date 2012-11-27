/*global console, define */

(function() {
    'use strict';

    /**
     * Returns a contructor function for the BoxesView
     */
    define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'js/app',
        'js/views/BoxView',
        'marionetteAsync'
        ],

        function(
            $,
            _,
            Backbone,
            Marionette,
            app,
            BoxView
        ) {
            console.log('Entering js/views/BoxesView');

            var BoxesView = Marionette.Layout.extend({

                template: 'BoxesView',

                regions: {
                    inbox: '#inbox',
                    outbox: '#outbox',
                    sentbox: '#sentbox'
                },

                initialize: function() {
                    console.log("Entering BoxesView initialize");
                    _.bindAll(this);
                },

                onRender: function() {
                    this.inbox.show(new BoxView({ parentId: 'inbox' }));
                    this.outbox.show(new BoxView({ parentId: 'outbox' }));
                    this.sentbox.show(new BoxView({ parentId: 'sentbox' }));
                }
            });

            return BoxesView;
        }
    );

}());
