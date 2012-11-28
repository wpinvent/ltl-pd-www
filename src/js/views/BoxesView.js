/*global define */

(function() {
    'use strict';

    /**
     * Returns a contructor function for the BoxesView
     */
    define(['jquery', 'underscore', 'backbone', 'marionette', 'marionetteAsync'],

        function($, _, Backbone, Marionette) {
            console.log('Entering js/views/BoxesView');

            var BoxesView = Marionette.Layout.extend({

                regions: {
                    inbox: '#inbox',
                    outbox: '#outbox',
                    sentbox: '#sentbox'
                },

                initialize: function(options) {
                    console.log("Entering BoxesView initialize");
                    _.bindAll(this);

                    this.app = options.app;
                },

                onRender: function() {
                    this.inbox.show(
                        this.app.viewFactory.createView({
                            parentId: 'inbox',
                            viewType: 'itemCollection'
                        }));

                    this.outbox.show(
                        this.app.viewFactory.createView({
                            parentId: 'outbox',
                            viewType: 'itemCollection'
                        }));

                    this.sentbox.show(
                        this.app.viewFactory.createView({
                            parentId: 'sentbox',
                            viewType: 'itemCollection'
                        }));
                }
            });

            return BoxesView;
        }
    );

}());
