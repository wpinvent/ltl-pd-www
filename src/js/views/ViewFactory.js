/*global alert, console, define*/
(function() {
    'use strict';

    define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'js/views/ItemCollectionItemView',
        'js/views/ItemDetailView',
        'js/views/ItemEditView',
        'js/views/ItemAddView',
        'js/views/ItemDeleteView',
        'marionetteAsync'
        ],
        function(
            $,
            _,
            Backbone,
            Marionette,
            ItemCollectionItemView,
            ItemDetailView,
            ItemEditView,
            ItemAddView,
            ItemDeleteView
        ) {

            var ViewFactory = function() {
                var self = this;

                _.bindAll(self);

                self.createView = function(item, type, viewType, View) {
                    var templateName = self.app.descriptor.templates[type][viewType].templateName;

                    if (!View) {
                        View = self.getItemViewConstructor(viewType);
                    }

                    return new View({
                        // Don't change the property names "model" and "template" - these are special
                        model: item,
                        template: templateName,
                        type: type,
                        viewType: viewType,
                        app: this.app
                    });
                };

                /**
                 * Returns the generic item View constructor function for the given viewType
                 */
                self.getItemViewConstructor = function(viewType) {

                    var View = null;

                    switch (viewType) {
                        case 'collection':
                            View = ItemCollectionItemView;
                            break;

                        case 'detail':
                            View = ItemDetailView;
                            break;

                        case 'edit':
                            View = ItemEditView;
                            break;

                        case 'add':
                            View = ItemAddView;
                            break;

                        case 'delete':
                            View = ItemDeleteView;
                            break;
                    }

                    return View;
                };
            };

            return ViewFactory;
        }
    );

}());
