/*global define */

(function() {
    'use strict';

    /**
     * ItemCollectionView
     * Constructor Function
     * Displays a raw list of items, with no header/footer/etc.
     */
    define(['jquery', 'underscore', 'backbone', 'marionette', 'js/models/Node', 'js/collections/NodeCollection', 'marionetteAsync'],

        function( $, _, Backbone, Marionette, Node, NodeCollection ) {

            console.log('Entering js/views/ItemCollectionView');

            var ItemCollectionView = Marionette.CollectionView.extend({

                viewName: 'ItemCollectionView',

                itemViewOptions: {
                    viewType: 'itemCollectionItem'
                },

                initialize: function(options) {
                    console.log("Entering ItemCollectionView initialize");
                    _.bindAll(this);

                    this.app = options.app;
                    this.app.guard.isNotNullOrUndefined(options.parentType, 'options.parentType', 'ItemCollectionView initialize');
                    this.app.guard.isNotNullOrUndefined(options.parentId, 'options.parentId', 'ItemCollectionView initialize');
                    this.app.guard.isNotNullOrUndefined(options.viewType, 'options.viewType', 'ItemCollectionView initialize');

                    this.parentType = options.parentType;
                    this.parentId = options.parentId;
                    this.viewType = options.viewType;
                    this.collection = new NodeCollection();
                },

                getItemView: function(item) {
                    return this.app.viewFactory.getViewConstructor({
                        viewType: this.itemViewOptions.viewType
                    });
                },

                buildItemView: function(item, ItemViewType, itemViewOptions) {
                    var options = {
                        model: item,
                        type: item.get('type'),
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

                    this.app.native.getChildNodes(this.parentType, this.parentId)
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
