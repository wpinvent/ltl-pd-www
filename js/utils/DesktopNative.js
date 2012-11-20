/**
 * Returns an constructor function for the native wrapper for desktop (non-device) testing.
 */
define(['jquery', 'underscore', 'backbone'],
    function($, _, Backbone) {

        console.log('Entering js/utils/DesktopNative');

        var DesktopNative = function() {
            var self = this;

            self.login = function(userName, password, onSuccess, onFailure) {
                setTimeout(function() {
                    onSuccess();
                }, 500);
            };
        };

        return DesktopNative;
    }
);
