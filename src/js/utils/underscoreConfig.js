/*global define*/

(function() {
    'use strict';

    define(['jquery', 'underscore'],

        function($, _) {

            console.log('Entering js/utils/underscoreConfig');

            var underscoreConfig = {
                initialize: function(app) {

                    // Use {{ }} style templates rather than the <%= %> style
                    // {{= ... }} is interpolate
                    // {{- ... }} is escape
                    // {{ ... }} is evaluate
                    _.templateSettings = {
                        interpolate: /\{\{=(.+?)\}\}/g,
                        escape: /\{\{-(.+?)\}\}/g,
                        evaluate: /\{\{(.+?)\}\}/g
                    };
                }
            };

            return underscoreConfig;
        }
    );
}());
