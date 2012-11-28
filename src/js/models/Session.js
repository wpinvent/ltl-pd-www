/*global define */

(function() {
    'use strict';

    define(['jquery', 'underscore', 'backbone'],
        function($, _, Backbone) {

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
}());
