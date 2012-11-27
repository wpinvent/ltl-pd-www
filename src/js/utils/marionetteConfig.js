/*global console, define*/

(function() {
    'use strict';

    define(['jquery', 'underscore', 'backbone', 'marionette', 'marionetteAsync'],

        function($, _, Backbone, Marionette) {

            console.log('Entering js/utils/marionetteConfig');

            var marionetteConfig = {

                /**
                 * Initializes Marionette settings that depend on the app or one or more app services.
                 */
                initialize: function(app) {

                    /**
                     * Updates the Marionette Async TemplateCache loadTemplate function to
                     * attempt to load templates using a "native" implementation.  This could be
                     * a standard AJAX get for a file, or it could load the template from a database
                     * file in native-land.
                     */
                    Marionette.TemplateCache.prototype.loadTemplate = function(templateId, callback) {

                        var self = this;

                        console.log("Getting template named: ");
                        console.log(templateId);

                        app.native.loadTemplate(templateId)
                            .done(function(template) {
                                if (!template || template.length === 0){
                                    var msg = "Invalid/empty template: '" + templateId + "'";
                                    var err = new Error(msg);
                                    err.name = "EmptyTemplateError";
                                    throw err;
                                }
                          
                                template = self.compileTemplate(template);
                          
                                callback.call(self, template);
                            })
                            .fail(function(error) {
                                var msg = "Could not find template: '" + templateId + "' - " + error;
                                var err = new Error(msg);
                                err.name = "NoTemplateError";
                                throw err;
                            });

                    };
                }
            };

            return marionetteConfig;
        }
    );
}());
