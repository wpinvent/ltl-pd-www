/*global console, define*/

(function() {
    'use strict';

    define(['jquery', 'underscore', 'backbone', 'marionette'],

        function($, _, Backbone, Marionette) {

            console.log('Entering js/utils/marionetteConfig');

            // Change global Marionette stuff here...

            // Change Marionette to use pre-fetched templates, rather than looking for them by DOM element id selector
            // https://github.com/marionettejs/backbone.marionette/wiki/Using-marionette-with-requirejs
            // TODO: I don't think this actually gets used when you have the tpl plugin for require.js...
            Marionette.TemplateCache.prototype.loadTemplate = function(templateId) {
                var template = templateId;

                if (!template || template.length === 0) {
                    var message = "Could not find template: '" + templateId + "'",
                        error = new Error(message);

                    error.name = "NoTemplateError";
                    throw error;
                }

                return template;
            };
        }
    );
}());
