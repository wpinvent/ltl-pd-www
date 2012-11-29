/*global define*/
(function() {
    'use strict';

    define(['jquery', 'underscore', 'backbone'],
        function($, _, Backbone) {

            console.log('Entering js/utils/backboneConfig');

            var backboneConfig = {
                initialize: function(app) {
                    // Change global Backbone stuff here...
                }
            };

            return backboneConfig;
        }
    );
}());
