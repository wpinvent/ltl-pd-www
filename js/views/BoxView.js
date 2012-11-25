/*global console, define */

(function() {
    'use strict';

    /**
     * Returns a contructor function for the BoxView
     */
    define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'js/app',
        'js/models/Node',
        'js/collections/NodeCollection',
        'tpl!html/BoxView.html'
        ],

        function(
            $,
            _,
            Backbone,
            Marionette,
            app,
            Node,
            NodeCollection,
            template
        ) {

            console.log('Entering js/views/BoxView');

            var BoxView = Marionette.CollectionView.extend({

                template: template,

                initialize: function(options) {
                    console.log("Entering BoxView initialize");

                    this.collection = new NodeCollection();
                    this.parentId = options.parentId;

                    _.bindAll(this);
                },

                getItemView: function(item) {
                    return app.viewFactory.createItemView(item.get('type'), 'collection');
                },

                onRender: function() {
                    this.loadData();
                },

                loadData: function() {
                    app.native.getChildNodes(
                        this.parentId,
                        this.loadDataSuccess,
                        this.loadDataFailure);
                },

                loadDataSuccess: function(data) {
                    var i, node;

                    console.log('loadDataSuccess: ' + data);

                    for (i = 0; i < data.length; i+=1) {
                        node = new Node(data[i]);
                        this.collection.add(node);
                    }
                },

                loadDataFailure: function(error) {
                    console.log("loadDataFailure:");
                    console.log(error);
                }
            });

            return BoxView;
        }
    );

}());
