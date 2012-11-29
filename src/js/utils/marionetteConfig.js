/*global define*/

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

                        console.log("Marionette.TemplateCache (override): loadTemplate: ", templateId);
                        self.templateId = templateId;

                        app.native.loadTemplate(templateId)
                            .done(function(template) {
                                app.guard.isNotEmptyString(template, 'template', 'Marionette.TemplateCache.loadTemplate');

                                template = self.compileTemplate(template);

                                callback.call(self, template);
                            })
                            .fail(function(error) {
                                console.log(error);
                                app.guard.throwError('TemplateRetrievalError', 'Failed to retrieve template: ' + self.templateId, 'Marionette.TemplateCache.loadTemplate');
                            });

                    };
                }
            };

            return marionetteConfig;
        }
    );
}());
