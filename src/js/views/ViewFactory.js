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

                    return new View({
                        model: item,
                        template: templateName
                    });
                };

                /**
                 * Returns the generic item View constructor function for the given viewType
                 */
                self.getItemViewType = function(viewType) {

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
