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
        'js/views/ItemDeleteView'
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

                self.initialize = function(app) {
                    var type, viewType;

                    self.app = app;

                    for (type in app.descriptor.templates) {
                        for (viewType in type) {

                            console.log(type + ' ' + viewtype);
                        }
                    }
                };

                self.createItemView = function(type, viewType) {

                    var templateName = self.app.descriptor.templates[type][viewType],
                        View = null;

                    switch (viewType) {
                        case 'collection':
                            View = ItemCollectionItemView;
                            break;

                        case 'detail':
                            View = ItemDetailView;
                            break;

                        case 'edit':
                            View = ItemEditView;

                        case 'add':
                            View = ItemAddView;

                        case 'delete':
                            View = ItemDeleteView;
                    }

                    if (_.isNull(View)) {
                        return null;
                    }

                    return new View({ template: template });
                };
            };

            return ViewFactory;
        }
    );

}());
