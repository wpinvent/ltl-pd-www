/*global define */
(function() {
    'use strict';

    /**
     * Returns a constructor function for AppController
     * (Note: this is not the typical definition of a controller - it's more of just a utility class.
     * See Marionette AppRouter/Controller docs.)
     */
    define(['jquery', 'underscore', 'backbone', 'marionette', 'marionetteAsync'],

        function($, _, Backbone, Marionette) {

            console.log('Entering js/controllers/AppController');

            /**
             * Constructor function for AppController
             * Caller needs to set the "app" property on this object before use.
             */
            var AppController = function() {
                var self = this;

                /**
                 * Prints a special log message for debugging controller/routing issues
                 * @param name The name of the controller method called
                 */
                self.log = function(name) {
                    var args = Array.prototype.slice.call(arguments, 1);
                    console.log("AppController: " + name + ': ' + args.join(', '));
                };

                /**
                 * Helper method to show a view object in the root application region
                 */
                self.showView = function(view) {
                    self.app.rootRegion.show(view);
                };

                /**
                 * Helper method to trigger a URL route via the app router
                 */
                self.triggerRoute = function(route) {
                    self.app.router.triggerRoute(self.app.root);
                };

                /**
                 * Index - redirects to the Login View
                 */
                self.index = function() {
                    self.log('index', 'triggering route: ' + self.app.root);
                    self.triggerRoute(self.app.root);
                };

                /**
                 * Login - shows the Login View
                 */
                self.login = function() {
                    var view;

                    self.log('login');

                    view = self.app.viewFactory.createView({ viewType: 'login' });
                    self.showView(view);
                };

                /**
                 * About - shows the About View
                 */
                self.about = function() {
                    var view;

                    self.log('about');

                    view = self.app.viewFactory.createView({ viewType: 'about' });
                    self.showView(view);
                };

                /**
                 * Settings
                 */
                self.settings = function() {
                    var view;

                    self.log('settings');

                    view = self.app.viewFactory.createView({ viewType: 'settings' });
                    self.showView(view);
                };

                /**
                 * Boxes - shows the inbox/outbox/sent box view
                 */
                self.boxes = function() {
                    var view;

                    self.log('boxes');

                    view = self.app.viewFactory.createView({ viewType: 'boxes' });
                    self.showView(view);
                };

                self.itemDetail = function(type, id) {
                    var view;

                    self.log('itemDetail', type, id);

                    // TODO: lookup model here, or just pass id and let view handle the model?

                    view = self.app.viewFactory.createView({
                        viewType: 'itemDetail',
                        type: type,
                        id: id
                    });

                    self.showView(view);
                };

                /**
                 * Edit item - shows the item edit view
                 */
                self.itemEdit = function(type, id) {
                    var view;

                    self.log('itemEdit', type, id);

                    // TODO: lookup model here, or just pass id and let view handle the model?

                    view = self.app.viewFactory.createView({
                        viewType: 'itemEdit',
                        type: type,
                        id: id
                    });

                    self.showView(view);
                };

                /**
                 * Delete item - shows the item delete confirmation view
                 */
                self.itemDelete = function(type, id) {
                    var view;

                    self.log('itemDelete', type, id);

                    // TODO: lookup model here, or just pass id and let view handle the model?

                    view = self.app.viewFactory.createView({
                        viewType: 'itemDelete',
                        type: type,
                        id: id
                    });

                    self.showView(view);
                };

                self.itemAdd = function(type) {
                    var view;

                    self.log('itemAdd', type);

                    view = self.app.viewFactory.createView({
                        viewType: 'itemAdd',
                        type: type
                    });

                    self.showView(view);
                };

                /**
                 * Add image - shows the add image view
                 */
                self.itemAddImage = function(type, id) {
                    var view;

                    self.log('itemAddImage', type, id);

                    // TODO: lookup model here, or just pass id and let view handle the model?

                    view = self.app.viewFactory.createView({
                        viewType: 'itemAddImage',
                        type: type,
                        id: id
                    });

                    self.showView(view);
                };

                /**
                 * Add signature
                 */
                self.itemAddSignature = function(type, id) {
                    var view;

                    self.log('itemAddSignature', type, id);

                    // TODO: lookup model here, or just pass id and let view handle the model?

                    view = self.app.viewFactory.createView({
                        viewType: 'itemAddSignature',
                        type: type,
                        id: id
                    });

                    self.showView(view);
                };

                /**
                 * Add note
                 */
                self.itemAddNote = function(type, id) {
                    var view;

                    self.log('itemAddNote', type, id);

                    // TODO: lookup model here, or just pass id and let view handle the model?

                    view = self.app.viewFactory.createView({
                        viewType: 'itemAddNote',
                        type: type,
                        id: id
                    });

                    self.showView(view);
                };

                /**
                 * Other/Unknown
                 */
                self.other = function(path) {
                    self.log('other', path);
                };
            };

            return AppController;
        }
    );
}());
