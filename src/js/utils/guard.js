/*global define*/

(function() {
    'use strict';

    /**
     * guard - utility function for making and throwing errors
     */
    define(['jquery', 'underscore'],
        function($, _) {

            var guard = {

                makeError: function(errorName, errorMessage, errorLocation) {
                    if (errorLocation) {
                        errorMessage = errorLocation + ': ' + errorMessage;
                    }
                    var error = new Error(errorMessage);
                    error.name = errorName;
                    return error;
                },

                throwError: function(errorName, errorMessage, errorLocation) {
                    var error = this.makeError(errorName, errorMessage, errorLocation);
                    throw error;
                },

                isNotUndefined: function(obj, name, location) {

                    if (_.isUndefined(obj)) {
                        this.throwError('UndefinedObjectError', 'Object cannot be undefined: ' + name, location);
                    }
                },

                isNotNull: function(obj, name, location) {

                    if (_.isNull(obj)) {
                        this.throwError('NullObjectError', 'Object cannot be null: ' + name, location);
                    }
                },

                isNotNullOrUndefined: function(obj, name, location) {

                    this.isNotNull(obj, name, location);

                    this.isNotUndefined(obj, name, location);
                },

                isString: function(obj, name, location) {

                    this.isNotNullOrUndefined(obj, name, location);

                    if (!_.isString(obj)) {
                        this.throwError('InvalidStringError', 'Object must be a string: ' + name, location);
                    }
                },

                isNotEmptyString: function(obj, name, location) {

                    this.isString(obj, name, location);

                    if (obj.length === 0) {
                        this.throwError("EmptyStringError", 'Object must be a non-empty string', location);
                    }
                },

                collectionContains: function(collection, item, collectionName, itemName, location) {

                    this.isNotNullOrUndefined(collection, collectionName, location);

                    this.isNotNullOrUndefined(item, itemName, location);

                    if (!_.contains(collection, item)) {
                        this.throwError('ItemNotInCollectionError', 'Item ' + itemName + ' was not found in collection ' + collectionName, location);
                    }
                }
            };

            return guard;
        }
    );
}());

