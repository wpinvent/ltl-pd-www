/*global console, define, setTimeout*/

(function(console, define, setTimeout) {
'use strict';

/**
 * Returns an constructor function for the native wrapper that uses Cordova.
 */
define(['jquery', 'underscore', 'backbone'],

    function($, _, Backbone) {

        console.log("Entering js/utils/CordovaNative");

        /**
         * Constructor function
         */
        var CordovaNative = function() {
            var self = this;

            self.login = function(userName, password, onSuccess, onFailure) {
                setTimeout(function() {
                    onSuccess();
                }, 500);
            };
        };

        return CordovaNative;
    }
);

}(console, define, setTimeout));
