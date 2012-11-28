/*global define*/

(function() {
    'use strict';

    /**
     * Returns an constructor function for the native wrapper for desktop (non-device) testing.
     */
    define(['jquery', 'underscore'],

        function($, _) {

            console.log('Entering js/utils/DesktopNative');

            /**
             * Constructs an object that provides desktop stubs for native calls
             */
            var DesktopNative = function() {
                var self = this;

                /**
                 * Wrapper for $.getJSON
                 */
                self.getJSON = function(url) {
                    var gettingJSON = new $.Deferred();

                    console.log('Getting json for url: ' + url);

                    $.getJSON(url)
                        .done(function(data, textStatus, jqXHR) {
                            gettingJSON.resolve(data);
                        })
                        .fail(function(jqXHR, textStatus, errorThrown) {
                            console.log("Error in $.getJSON:");
                            console.log(jqXHR);
                            console.log(textStatus);
                            console.log(errorThrown);

                            gettingJSON.reject(textStatus);
                        });

                    return gettingJSON.promise();
                };

                /**
                 * Wrapper for $.get
                 */
                self.get = function(url) {
                    var gettingFile = new $.Deferred();

                    $.get(url)
                        .done(function(data, textStatus, jqXHR) {
                            gettingFile.resolve(data);
                        })
                        .fail(function(jqXHR, textStatus, errorThrown) {
                            gettingFile.reject(textStatus);
                        });

                    return gettingFile.promise();
                };

                /**
                 * Gets the app schema (returns a promise)
                 */
                self.getAppSchema = function() {
                    return self.getJSON('data/appSchema.json');
                };

                /**
                 * Gets the app descriptor (returns a promise)
                 */
                self.getAppDescriptor = function() {
                    return self.getJSON('data/appDescriptor.json');
                };

                /**
                 * Gets a template from the html/ folder (returns a promise)
                 */
                self.loadTemplate = function(templateName) {
                    var url = 'html/' + templateName + '.html';
                    return self.get(url);
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

                    self.getJSON('data/data.json')
                        .done(function(data) {
                            var inserts = data.inserts,
                                nodes = _.where(inserts, { "id": id }),
                                node = _.first(nodes);

                            gettingNode.resolve(node);
                        })
                        .fail(function(error) {
                            gettingNode.reject(error);
                        });

                    return gettingNode;
                };

                /**
                 * Get child nodes by parentId (returns a promise)
                 */
                self.getChildNodes = function(parentId) {
                    var gettingChildNodes = new $.Deferred();

                    self.getJSON('data/data.json')
                        .done(function(data) {
                            var inserts = data.inserts,
                                nodes = _.where(inserts, { "parentId": parentId });

                            gettingChildNodes.resolve(nodes);
                        })
                        .fail(function(error) {
                            gettingChildNodes.reject(error);
                        });

                    return gettingChildNodes;
                };
            };

            return DesktopNative;
        }
    );

}());
