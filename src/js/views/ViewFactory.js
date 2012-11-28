/*global alert, console, define*/

(function() {
    'use strict';

    define([
        'jquery',
        'underscore',
        'backbone',
        'marionette',
        'js/views/LoginView',
        'js/views/AboutView',
        'js/views/SettingsView',
        'js/views/BoxesView',
        'js/views/ItemCollectionView',
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
            LoginView,
            AboutView,
            SettingsView,
            BoxesView,
            ItemCollectionView,
            ItemCollectionItemView,
            ItemDetailView,
            ItemEditView,
            ItemAddView,
            ItemDeleteView
        ) {

            var ViewFactory = function() {
                var self = this;

                _.bindAll(self);

                /**
                 * Mapping of the viewType string to the view's constructor function
                 */
                self.viewTypeToViewConstructorMap = {
                    'login': LoginView,
                    'about': AboutView,
                    'settings': SettingsView,
                    'boxes': BoxesView,
                    'itemCollection': ItemCollectionView,
                    'itemCollectionItem': ItemCollectionItemView,
                    'itemDetail': ItemDetailView,
                    'itemEdit': ItemEditView,
                    'itemAdd': ItemAddView,
                    'itemDelete': ItemDeleteView
                };

                /**
                 * Mapping of the viewType string to well-known (non-configured) template names
                 */
                self.viewTypeToViewTemplateMap = {
                    'login': 'LoginView',
                    'about': 'AboutView',
                    'settings': 'SettingsView',
                    'boxes': 'BoxesView',
                    'itemCollection': 'ItemCollectionView',
                    'itemCollectionItem': 'ItemCollectionItemView',
                    'itemDetail': 'ItemDetailView',
                    'itemEdit': 'ItemEditView',
                    'itemAdd': 'ItemAddView',
                    'itemDelete': 'ItemDeleteView'
                };

                /**
                 * Gets a view constructor function for the given view type string
                 */
                self.getViewConstructor = function(options) {
                    var viewTypes = _.keys(self.viewTypeToViewConstructorMap),
                        viewType = options.viewType;

                    if (!viewType) {
                        var error = new Error('View type is required.');
                        error.Name = "MissingViewTypeError";
                        throw error;
                    }

                    if (!_.contains(viewTypes, viewType)) {
                        var error = new Error('Invalid view type: ' + viewType);
                        error.Name = "InvalidViewTypeError";
                        throw error;
                    }

                    return self.viewTypeToViewConstructorMap[viewType];
                };

                self.getViewTemplate = function(options) {
                    var type = options.type,
                        viewType = options.viewType,
                        templates = self.app.descriptor.templates;

                    if (templates[type] && templates[type][viewType]) {
                        return templates[type][viewType].templateName;
                    }

                    if (self.viewTypeToViewTemplateMap[viewType]) {
                        return self.viewTypeToViewTemplateMap[viewType];
                    }

                    var error = new Error('Unable to determine template.');
                    error.Name = "UnknownTemplateError";
                    throw error;
                };

                /**
                 * Creates a view
                 * options are passed through to the View's constructor
                 * If options contains a View constructor function it is used
                 */
                self.createView = function(options) {
                    var View = options.View || self.getViewConstructor(options),
                        template = options.template || self.getViewTemplate(options);

                    options.View = View;
                    options.template = template;
                    options.app = self.app;

                    return new View(options);
                };
            };

            return ViewFactory;
        }
    );

}());
