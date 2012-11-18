define(['jquery', 'underscore', 'backbone'],
    function($, _, Backbone) {

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
