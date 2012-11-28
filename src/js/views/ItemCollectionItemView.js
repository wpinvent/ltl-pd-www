/*global alert, console, define */
(function() {
    'use strict';

    define(['jquery', 'underscore', 'backbone', 'marionette', 'marionetteAsync'],
        function($, _, Backbone, Marionette) {

            var ItemCollectionItemView = Marionette.ItemView.extend({

                ui: {
                    $container: "#container"
                }, 

                events: {
                    'click #viewItem'           : 'onViewItem',
                    'click #viewItemInline'     : 'onViewItemInline',
                    'click #editItem'           : 'onEditItem',
                    'click #editItemInline'     : 'onEditItemInline',
                    'click #deleteItem'        : 'onDeleteItem',
                    'click #deleteItemInline'  : 'onDeleteItemInline',
                    'click #addImageToItem'     : 'onAddImageToItem',
                    'click #addSignatureToItem' : 'onAddSignatureToItem',
                    'click #addNoteToItem'      : 'onAddNoteToItem'
                },

                initialize: function(options) {
                    console.log('Entering ItemCollectionItemView initialize: ' + options);
                    _.bindAll(this);

                    this.app = options.app;
                    this.viewType = options.viewType;
                    this.id = this.model.get('id');
                    this.type = this.model.get('type');
                    this.nodeType = this.model.get('nodeType');
                },

                onRender: function() {
                    this.addDynamicControls();
                },

                createActionUrl: function(action) {
                    return action + '/' + this.type + '/' + this.nodeType + '/' + this.id;
                },

                triggerActionRoute: function(action) {
                    var url = this.createActionUrl(action);
                    this.app.router.triggerRoute(url);
                },

                onViewItem: function() {
                    this.triggerActionRoute('view');
                },

                onViewItemInline: function() {
                    console.log("Expanding item for view: " + this.id);
                },

                onEditItem: function() {
                    this.triggerActionRoute('edit');
                },

                onEditItemInline: function() {
                    console.log("Expanding item for edit: " + this.id);
                },

                onDeleteItem: function() {
                    this.triggerActionRoute('delete');
                },

                onDeleteItemInline: function() {
                    console.log("Deleting item inline: " + this.id);
                    this.$el.hide('slow');
                },

                onAddImageToItem: function() {
                    this.triggerActionRoute('addImage');
                },

                onAddSignatureToItem: function() {
                    this.triggerActionRoute('addSignature');
                },

                onAddNoteToItem: function() {
                    this.triggerActionRoute('addNote');
                },

                enableViewItem: function() {
                    this.ui.$container.append('<button id="viewItem" type="button" class="btn btn-primary">View &gt;</button>');
                },

                enableViewItemInline: function() {
                    this.ui.$container.append('<button id="viewItemInline" type="button" class="btn btn-primary">View V</button>');
                },

                enableEditItem: function() {
                    this.ui.$container.append('<button id="editItem" type="button" class="btn">Edit &gt;</button>');
                },

                enableEditItemInline: function() {
                    this.ui.$container.append('<button id="editItemInline" type="button" class="btn">Edit V</button>');
                },

                enableDeleteItem: function() {
                    this.ui.$container.append('<button id="deleteItem" type="button" class="btn btn-danger">Delete &gt;</button>');
                },

                enableDeleteItemInline: function() {
                    this.ui.$container.append('<button id="deleteItemInline" type="button" class="btn btn-danger">Delete X</button>');
                },

                enableAddImageToItem: function() {
                    this.ui.$container.append('<button id="addImageToItem" type="button" class="btn btn-info">Image</button>');
                },

                enableAddSignatureToItem: function() {
                    this.ui.$container.append('<button id="addSignatureToItem" type="button" class="btn btn-info">Signature</button>');
                },

                enableAddNoteToItem: function() {
                    this.ui.$container.append('<button id="addNoteToItem" type="button" class="btn btn-info">Note</button>');
                },

                addDynamicControl: function(action) {
                    switch (action) {
                        case "viewItem":
                            this.enableViewItem();
                            break;

                        case "viewItemInline":
                            this.enableViewItemInline();
                            break;

                        case "editItem":
                            this.enableEditItem();
                            break;

                        case "editItemInline":
                            this.enableEditItemInline();
                            break;

                        case "deleteItem":
                            this.enableDeleteItem();
                            break;

                        case "deleteItemInline":
                            this.enableDeleteItemInline();
                            break;

                        case "addImageToItem":
                            this.enableAddImageToItem();
                            break;

                        case "addSignatureToItem":
                            this.enableAddSignatureToItem();
                            break;

                        case "addNoteToItem":
                            this.enableAddNoteToItem();
                            break;
                    }
                },

                addDynamicControls: function() {

                    var test = this.$el, 
                        actions = this.app.descriptor.templates[this.type][this.viewType].actions;

                    if (!actions) {
                        return;
                    }

                    _.each(actions, function(action) {
                        this.addDynamicControl(action);
                    }, this);
                }
            });

            return ItemCollectionItemView;
        }
    );

}());
