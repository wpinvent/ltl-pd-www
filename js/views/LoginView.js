/*global alert, console, define*/

(function() {
    'use strict';

    /**
     * Returns a contructor function for the LoginView
     */
    define(['jquery', 'underscore', 'backbone', 'marionette', 'js/app', 'js/models/Session', 'tpl!html/LoginView.html'],

        function($, _, Backbone, Marionette, app, Session, template) {

            console.log('Entering js/views/LoginView');

            var LoginView = Marionette.ItemView.extend({

                template: template,

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

                    //var app = require('js/app');
                    app.native.login(
                        this.model.get('userName'),
                        this.model.get('password'),
                        this.onLoginSuccess,
                        this.onLoginFailure);
                },

                onLoginSuccess: function(userName, password) {
                    alert("Logged in!");

                    app.session = this.model;
                    app.router.triggerRoute('boxes');
                },

                onLoginFailure: function() {
                    alert("Login error!");
                }
            });

            return LoginView;
        }
    );
}());
