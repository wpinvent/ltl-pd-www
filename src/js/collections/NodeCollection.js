/*global define*/
(function() {
    'use strict';

    /**
     * Returns a contructor function for the Node model
     */
    define(['jquery', 'underscore', 'backbone', 'js/models/Node'],

        function($, _, Backbone, Node) {

            console.log('Entering js/collections/NodeCollection');

            var NodeCollection = Backbone.Collection.extend({

                model: Node,

                initialize: function() {
                    console.log("Entering NodeCollection initialize");
                }
            });

            return NodeCollection;
        }
    );
}());
