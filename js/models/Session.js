define(['jquery', 'underscore', 'backbone', 'marionette'],
    function($, _, Backbone, Marionette) {

        var Session = Backbone.Model.extend({

            isLoggedIn: function() {
                return typeof userName !== 'undefined';
            }
        });

        return Session;
    }
)