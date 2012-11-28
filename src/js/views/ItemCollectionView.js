/*global define */

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
        'js/models/Node',
        'js/collections/NodeCollection',
        'marionetteAsync'
        ],

        function(
            $,
            _,
            Backbone,
            Marionette,
            Node,
            NodeCollection
        ) {

            console.log('Entering js/views/ItemCollectionView');

            var ItemCollectionView = Marionette.CollectionView.extend({

                initialize: function(options) {
                    console.log("Entering ItemCollectionView initialize");
                    _.bindAll(this);

                    this.app = options.app;
                    this.parentId = options.parentId;
                    this.viewType = 'itemCollection';
                    this.itemViewType = 'itemCollectionItem';
                    this.collection = new NodeCollection();
                },

                getItemView: function(item) {
                    return this.app.viewFactory.getViewConstructor({ viewType: this.itemViewType });
                },

                buildItemView: function(item, ItemViewType, itemViewOptions) {
                    var options = {
                        model: item,
                        type: item.get('type'),
                        viewType: this.itemViewType,
                        View: ItemViewType
                    };

                    _.extend(options, itemViewOptions);

                    return this.app.viewFactory.createView(options);
                },

                onRender: function() {
                    this.loadData();
                },

                loadData: function() {
                    console.log("Getting child nodes for parent: " + this.parentId);

                    this.app.native.getChildNodes(this.parentId)
                        .done(this.onLoadDataDone)
                        .fail(this.onLoadDataFail);
                },

                onLoadDataDone: function(data) {
                    var i,
                        length = data.length,
                        node;

                    console.log("Got " + length + " nodes for " + this.parentId);

                    for (i = 0; i < length; i+=1) {
                        node = new Node(data[i]);
                        this.collection.add(node);
                    }
                },

                onLoadDataFail: function(error) {
                    console.log("loadData failure:");
                    console.log(error);
                }
            });

            return ItemCollectionView;
        }
    );

}());
