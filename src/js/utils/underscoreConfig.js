/*global define*/

(function() {
    'use strict';

    define(['jquery', 'underscore'],

        function($, _) {

            console.log('Entering js/utils/underscoreConfig');

            var underscoreConfig = {
                initialize: function(app) {

                    // Use {{ }} style templates rather than the <%= %> style
                    _.templateSettings = {
                        interpolate: /\{\{(.+?)\}\}/g
                    };
                }
            };

            return underscoreConfig;
        }
    );
}());
