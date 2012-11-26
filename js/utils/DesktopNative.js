/*global console, define, setTimeout */

(function() {
    'use strict';

    /**
     * Returns an constructor function for the native wrapper for desktop (non-device) testing.
     */
    define(['jquery', 'underscore', 'backbone'],

        function($, _, Backbone) {

            console.log('Entering js/utils/DesktopNative');

            /**
             * Constructs an object that provides desktop stubs for native calls
             */
            var DesktopNative = function() {
                var self = this;

                /**
                 * Gets the app schema (returns a promise)
                 */
                self.getAppSchema = function() {
                    var gettingAppSchema = new $.Deferred();

                    $.getJSON('data/appSchema.json')
                        .done(function(data, textStatus, jqXHR) {
                            gettingAppSchema.resolve(data);
                        })
                        .fail(function(jqXHR, textStatus, errorThrown) {
                            gettingAppSchema.reject(textStatus);
                        });

                    return gettingAppSchema.promise();
                };

                /**
                 * Gets the app descriptor (returns a promise)
                 */
                self.getAppDescriptor = function() {
                    var gettingAppDescriptor = new $.Deferred();

                    $.getJSON('data/appDescriptor.json')
                        .done(function(data, textStatus, jqXHR) {
                            gettingAppDescriptor.resolve(data);
                        })
                        .fail(function(jqXHR, textStatus, errorThrown) {
                            gettingAppDescriptor.reject(textStatus);
                        });

                    return gettingAppDescriptor.promise();
                };

                /**
                 * Gets a template from the html/ folder (returns a promise)
                 */
                self.loadTemplate = function(templateName) {
                    var url = 'html/' + templateName + '.html',
                        loadingTemplate = new $.Deferred();

                    $.get(url)
                        .done(function(data, textStatus, jqXHR) {
                            loadingTemplate.resolve(data);
                        })
                        .fail(function(jqXHR, textStatus, errorThrown) {
                            loadingTemplate.reject(textStatus);
                        });

                    return loadingTemplate.promise();
                };

                /**
                 * Attempts a user login operation (returns a promise)
                 */
                self.login = function(userName, password) {
                    var loggingIn = new $.Deferred();

                    setTimeout(function() {
                        // no-op for testing
                        loggingIn.resolve();
                    }, 500);

                    return loggingIn.promise();
                };

                /**
                 * Get node by id (returns a promise)
                 */
                self.getNode = function(id) {
                    var gettingNode = new $.Deferred();

                    $.getJSON('data/data.json')
                        .done(function(data, textStatus, jqXHR) {
                            var children = _.where(data, { "id": id });
                            gettingNode.resolve(children);
                        })
                        .fail(function(jqXHR, textStatus, errorThrown) {
                            console.log("Error in DesktopNative getNode");
                            console.log(jqXHR);
                            console.log(textStatus);
                            console.log(errorThrown);
                            gettingNode.reject(textStatus);
                        });

                    return gettingNode.promise();
                };

                /**
                 * Get child nodes by parentId (returns a promise)
                 */
                self.getChildNodes = function(parentId) {
                    var gettingChildNodes = new $.Deferred();

                    $.getJSON('data/data.json')
                        .done(function(data, textStatus, jqXHR) {
                            var children = _.where(data, { "parentId": parentId });
                            gettingChildNodes.resolve(children);
                        })
                        .fail(function(jqXHR, textStatus, errorThrown) {
                            console.log("Error in DesktopNative getChildNodes");
                            console.log(jqXHR);
                            console.log(textStatus);
                            console.log(errorThrown);
                            gettingChildNodes.reject(textStatus);
                        });

                    return gettingChildNodes.promise();
                };
            };

            return DesktopNative;
        }
    );

}());
