/*global alert, console, define*/

(function() {
    'use strict';

    /**
     * Returns a contructor function for the LoginView
     */
    define(['jquery', 'underscore', 'backbone', 'marionette', 'js/app', 'js/models/Session'],

        function($, _, Backbone, Marionette, app, Session) {

            console.log('Entering js/views/LoginView');

            var LoginView = Marionette.ItemView.extend({

                template: 'LoginView',

                initialize: function() {
                    console.log("Entering LoginView initialize");
                    _.bindAll(this);

                    this.model = new Session();
                },

                // Marionette converts these to jQuery objects...
                ui: {
                    $userNameInput: '#userName',
                    $passwordInput: '#password'
                },

                events: {
                    'click #login': 'onLoginClick'
                },

                onLoginClick: function(event) {
                    this.model.set('userName', this.ui.$userNameInput.val());
                    this.model.set('password', this.ui.$passwordInput.val());

                    app.native.login(
                        this.model.get('userName'),
                        this.model.get('password'))
                        .done(this.onLoginSuccess)
                        .fail(this.onLoginFailure);
                },

                onLoginSuccess: function() {
                    app.session = this.model;
                    app.router.triggerRoute('boxes');
                },

                onLoginFailure: function(error) {
                    alert("Login error!");
                }
            });

            return LoginView;
        }
    );
}());
