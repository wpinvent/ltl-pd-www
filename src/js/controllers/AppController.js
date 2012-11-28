/*global console,define */

(function() {
    'use strict';

    /**
     * Returns a constructor function for AppController
     * (Note: this is not the typical definition of a controller - it's more of just a utility class.
     * See Marionette AppRouter/Controller docs.)
     */
    define(['jquery', 'underscore', 'backbone', 'marionette', 'marionetteAsync'],

        function( $, _, Backbone, Marionette) {

            console.log('Entering js/controllers/AppController');

            /**
             * Constructor function for AppController
             * Caller needs to set the "app" property on this object before use.
             */
            var AppController = function() {
                var self = this;

                /**
                 * Helper method to show a view object in the root application region
                 */
                self._showView = function(view) {
                    self.app.rootRegion.show(view);
                };

                /**
                 * Helper method to trigger a URL route via the app router
                 */
                self._triggerRoute = function(route) {
                    self.app.router.triggerRoute(self.app.root);
                };

                /**
                 * Index - redirects to the Login View
                 */
                self.index = function() {
                    console.log("AppController: index -> triggerRoute " + self.app.root);

                    self._triggerRoute(self.app.root);
                };

                /**
                 * Login - shows the Login View
                 */
                self.login = function() {
                    console.log("AppController: login");

                    var view;
                    view = self.app.viewFactory.createView({ viewType: 'login' });
                    self._showView(view);
                };

                /**
                 * About - shows the About View
                 */
                self.about = function() {
                    var view;

                    console.log("AppController: about");

                    view = self.app.viewFactory.createView({ viewType: 'about' });
                    self._showView(view);
                };

                /**
                 * Settings
                 */
                self.settings = function() {
                    var view;

                    console.log("AppController: settings");

                    view = self.app.viewFactory.createView({ viewType: 'settings' });
                    self._showView(view);
                };

                /**
                 * Boxes - shows the inbox/outbox/sent box view
                 */
                self.boxes = function() {
                    var view;

                    console.log("AppController: boxes");

                    view = self.app.viewFactory.createView({ viewType: 'boxes' });
                    self._showView(view);
                };

                /**
                 * View Item - shows the item detail view
                 */
                self.viewItem = function(type, id) {
                    var view;

                    console.log("AppController: view for type: " + type + ", id:" + id);

                    // TODO: lookup model here, or just pass id and let view handle the model?

                    view = self.app.viewFactory.createView({
                        viewType: 'itemDetail',
                        type: type,
                        id: id
                    });

                    self._showView(view);
                };

                /**
                 * Edit item - shows the item edit view
                 */
                self.editItem = function(type, id) {
                    var view;

                    console.log("AppController: edit for type: " + type + ", id:" + id);

                    // TODO: lookup model here, or just pass id and let view handle the model?

                    view = self.app.viewFactory.createView({
                        viewType: 'itemEdit',
                        type: type,
                        id: id
                    });

                    self._showView(view);
                };

                /**
                 * Delete item - shows the item delete confirmation view
                 */
                self.deleteItem = function(type, id) {
                    var view;

                    console.log("AppController: delete for type: " + type + ", id:" + id);

                    // TODO: lookup model here, or just pass id and let view handle the model?

                    view = self.app.viewFactory.createView({
                        viewType: 'itemDelete',
                        type: type,
                        id: id
                    });

                    self._showView(view);
                };

                /**
                 * Add image - shows the add image view
                 */
                self.addImageToItem = function(type, id) {
                    var view;

                    console.log("AppController: addImage for type: " + type + ", id:" + id);

                    // TODO: lookup model here, or just pass id and let view handle the model?

                    view = self.app.viewFactory.createView({
                        viewType: 'addImageToItem',
                        type: type,
                        id: id
                    });

                    self._showView(view);
                };

                /**
                 * Add signature
                 */
                self.addSignatureToItem = function(type, id) {
                    var view;

                    console.log("AppController: addSignature for type: " + type + ", id:" + id);

                    // TODO: lookup model here, or just pass id and let view handle the model?

                    view = self.app.viewFactory.createView({
                        viewType: 'addSignatureToItem',
                        type: type,
                        id: id
                    });

                    self._showView(view);
                };

                /**
                 * Add note
                 */
                self.addNoteToItem = function(type, id) {
                    var view;

                    console.log("AppController: addSignature for type: " + type + ", id:" + id);

                    // TODO: lookup model here, or just pass id and let view handle the model?

                    view = self.app.viewFactory.createView({
                        viewType: 'addNoteToItem',
                        type: type,
                        id: id
                    });

                    self._showView(view);
                };

                /**
                 * Other/Unknown
                 */
                self.other = function(path) {
                    console.log("AppController: ignoring unknown route: " + path);
                };
            };

            return AppController;
        }
    );
}());
