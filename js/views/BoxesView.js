/*global console, define */

(function() {

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
                },

                ui: {
                    $inboxTab: 'a[href="#inbox"]',
                    $outboxTab: 'a[href="#outbox"]',
                    $sentboxTab: 'a[href="#sentbox"]',
                    $inbox: '#inbox',
                    $outbox: '#outbox',
                    $sentbox: '#sentbox'
                },

                events: {
                    /*
                    'click a[href="#inbox"]': 'showInbox',
                    'click a[href="#outbox"]': 'showOutbox',
                    'click a[href="#sentbox"]': 'showSentbox'
                    */
                },

                onRender: function() {
                    //this.showInbox();
                },

                /*
                showInbox: function(e) {
                    this.ui.$inboxTab.tab('show');
                },

                showOutbox: function(e) {
                    this.ui.$outboxTab.tab('show');
                },

                showSentbox: function(e) {
                    this.ui.$sentboxTab.tab('show');
                }
                */
            });

            return BoxesView;
        }
    );

}());
