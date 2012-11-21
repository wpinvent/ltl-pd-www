/*global console, define */

(function(console, define) {
'use strict';

define(['jquery', 'underscore', 'backbone', 'marionette'],
    function($, _, Backbone, Marionette) {

        var Session = Backbone.Model.extend({

            initialize: function() {
                _.bindAll(this);
            },

            isLoggedIn: function() {
                return typeof this.userName !== 'undefined';
            }
        });

        return Session;
    }
);

}(console, define));
