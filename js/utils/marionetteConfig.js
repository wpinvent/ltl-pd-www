/*global console, define*/

(function() {
    'use strict';

    define(['jquery', 'underscore', 'backbone', 'marionette'],

        function($, _, Backbone, Marionette) {

            console.log('Entering js/utils/marionetteConfig');

            var marionetteConfig = {

                initialize: function(app) {
                    // Change global Marionette stuff here...

                    // Change marionette to load templates via a native lookup.
                    Marionette.TemplateCache.prototype.loadTemplate = function(templateId, callback) {

                        // Original implementation: Load from DOM by ID
                        //var template = $(templateId).html();
                  
                        app.native.loadtemplate(templateId)
                            .done(function(template) {
                                if (!template || template.length === 0){
                                    var msg = "Could not find template: '" + templateId + "'";
                                    var err = new Error(msg);
                                    err.name = "NoTemplateError";
                                    throw err;
                                }
                          
                                template = this.compileTemplate(template);
                          
                                callback.call(this, template);
                            })
                            .fail(function(error) {
                                var msg = "Could not find template: '" + templateId + "' - " + error;
                                var err = new Error(msg);
                                err.name = "NoTemplateError";
                                throw err;
                            });

                    };
                }
            }

            return marionetteConfig;
        }
    );
}());
