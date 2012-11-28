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
        'marionetteAsync'
        ],

        function(
            $,
            _,
            Backbone,
            Marionette,
            app,
            Node,
            NodeCollection
        ) {

            console.log('Entering js/views/BoxView');

            var BoxView = Marionette.CollectionView.extend({

                template: 'BoxView',

                initialize: function(options) {
                    console.log("Entering BoxView initialize");
                    _.bindAll(this);

                    this.collection = new NodeCollection();
                    this.parentId = options.parentId;
                    this.viewType = 'collection';
                },

                getItemView: function(item) {
                    return app.viewFactory.getItemViewConstructor(this.viewType);
                },

                buildItemView: function(item, ItemViewType, itemViewOptions) {
                    var type = item.get('type'),
                        viewType = this.viewType;

                    return app.viewFactory.createView(item, type, viewType, ItemViewType);
                },

                onRender: function() {
                    this.addDynamicControls();
                    this.loadData();
                },

                addDynamicControls: function() {
                    console.log("Adding dynamic controls to " + this.parentId);
                },

                loadData: function() {
                    console.log("Getting child nodes for parent: " + this.parentId);

                    app.native.getChildNodes(this.parentId)
                        .done(this.onLoadDataSuccess)
                        .fail(this.onLoadDataFailure);
                },

                onLoadDataSuccess: function(data) {
                    var i,
                        length = data.length,
                        node;

                    console.log("Got " + length + " nodes for " + this.parentId);

                    for (i = 0; i < length; i+=1) {
                        node = new Node(data[i]);
                        this.collection.add(node);
                    }
                },

                onLoadDataFailure: function(error) {
                    console.log("loadData failure:");
                    console.log(error);
                }
            });

            return BoxView;
        }
    );

}());
