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
                    nodeType: 'none',
                    type: 'none',
                    parentId: null,
                    id: '',
                    title: '',
                    properties: {
                    }
                },

                initialize: function() {
                    console.log("Entering Node initialize");
                }
            });

            return Node;
        }
    );
}());
