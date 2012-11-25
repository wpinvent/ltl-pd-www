/*global console, define, setTimeout */

(function() {
    'use strict';

    /**
     * Returns an constructor function for the native wrapper for desktop (non-device) testing.
     */
    define(['jquery', 'underscore', 'backbone'],

        function($, _, Backbone) {

            console.log('Entering js/utils/DesktopNative');

            var DesktopNative = function() {
                var self = this;

                /**
                 * Gets the app schema (returns a $.Deferred for caller to handle)
                 */
                self.getAppSchema = function() {
                    return $.getJSON('data/appSchema.json');
                };

                /**
                 * Gets the app descriptor (returns a $.Deferred for caller to handle)
                 */
                self.getAppDescriptor = function() {
                    return $.getJSON('data/appDescriptor.json');
                };

                /**
                 * Login
                 */
                self.login = function(userName, password, onSuccess, onFailure) {
                    setTimeout(function() {
                        onSuccess();
                    }, 500);
                };

                /**
                 * Get node by id
                 */
                self.getNode = function(id, onSuccess, onFailure) {

                    setTimeout(function() {

                        $.ajax({
                            url: 'data/data.json', 
                            dataType: 'json',
                            success: function(data, textStatus, jqXHR) {
                                var children = _.where(data, { "id": id });
                                onSuccess(children);
                            },
                            error: function(jqXHR, textStatus, errorThrown) {
                                console.log("Error in getNode");
                                console.log(jqXHR);
                                console.log(textStatus);
                                console.log(errorThrown);
                            }
                        });

                    }, 500);
                };

                /**
                 * Get child nodes by parentId
                 */
                self.getChildNodes = function(parentId, onSuccess, onFailure) {

                    setTimeout(function() {

                        $.ajax({
                            url: 'data/data.json', 
                            dataType: 'json',
                            success: function(data, textStatus, jqXHR) {
                                var children = _.where(data, { "parentId": parentId });
                                onSuccess(children);
                            },
                            error: function(jqXHR, textStatus, errorThrown) {
                                console.log("Error in getChildNodes");
                                console.log(jqXHR);
                                console.log(textStatus);
                                console.log(errorThrown);
                            }
                        });

                    }, 500);

                };
            };

            return DesktopNative;
        }
    );

}());
