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
        'tpl!html/BoxesView.html'
        ],

        function(
            $,
            _,
            Backbone,
            Marionette,
            app,
            BoxView,
            template
        ) {
            console.log('Entering js/views/BoxesView');

            var BoxesView = Marionette.Layout.extend({

                template: template,

                initialize: function() {
                    console.log("Entering BoxesView initialize");
                    _.bindAll(this);
                },

                regions: {
                    inbox: '#inbox',
                    outbox: '#outbox',
                    sentbox: '#sentbox'
                },

                onRender: function() {
                    this.inbox.show(new BoxView({
                        parentId: 'inbox'
                    }));

                    this.outbox.show(new BoxView({
                        parentId: 'outbox'
                    }));

                    this.sentbox.show(new BoxView({
                        parentId: 'sentbox'
                    }));
                },
            });

            return BoxesView;
        }
    );

}());
