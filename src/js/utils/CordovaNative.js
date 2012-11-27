/*global console, define, setTimeout*/

(function() {
    'use strict';

    /**
     * Returns an constructor function for the native wrapper that uses Cordova.
     */
    define(['jquery', 'underscore'],

        function($, _) {

            console.log("Entering js/utils/CordovaNative");

            /**
             * Constructor function
             */
            var CordovaNative = function() {
                var self = this;

                /**
                 * Wrapper for $.getJSON
                 */
                self.getJSON = function(url, filter) {
                    var gettingJSON = new $.Deferred();

                    console.log('Getting json for url: ' + url + ', and filter: ');
                    console.log(filter);

                    $.getJSON(url)
                        .done(function(data, textStatus, jqXHR) {

                            /* Filter the results using Underscore "where" if filter is provided */
                            if (filter) {
                                data = _.where(data, filter);
                            }

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
                    return self.getJSON('data/data.json', { "id": id });
                };

                /**
                 * Get child nodes by parentId (returns a promise)
                 */
                self.getChildNodes = function(parentId) {
                    return self.getJSON('data/data.json', { "parentId": parentId });
                };
            };

            return CordovaNative;
        }
    );
}());
