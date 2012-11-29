/*global cordova, define*/

(function() {
    'use strict';

    /**
     * Returns an constructor function for the native wrapper that uses Cordova.
     */
    define(['jquery', 'underscore', 'js/utils/DesktopNative'],

        function($, _, DesktopNative) {

            console.log("Entering js/utils/CordovaNative");

            // TODO: Implement cordova versions of things in DesktopNative
            /**
             * Constructor function
             */
            /*
            var CordovaNative = function() {
            };

            return CordovaNative;
            */

            // Just use Desktop for now
            return DesktopNative;
        }
    );
}());
