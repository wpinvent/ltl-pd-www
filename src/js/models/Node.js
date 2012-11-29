/*global define*/
(function() {
    'use strict';

    /**
     * Returns a contructor function for the Node model
     */
    define(['jquery', 'underscore', 'backbone'],

        function($, _, Backbone) {

            console.log('Entering js/models/Node');

            var Node = Backbone.Model.extend({

                defaults: {
                    type: null,
                    id: null,
                    parentType: null,
                    parentId: null,
                    title: '',
                    properties: { }
                },

                initialize: function(options) {
                }
            });

            return Node;
        }
    );
}());
