/*global define*/
(function() {
    'use strict';

    /**
     * Returns a contructor function for the LoginView
     */
    define(['jquery', 'underscore', 'backbone', 'marionette', 'js/app', 'js/models/Session', 'marionetteAsync'],

        function($, _, Backbone, Marionette, app, Session) {

            console.log('Entering js/views/LoginView');

            var LoginView = Marionette.ItemView.extend({

                template: 'LoginView',

                ui: {
                    $userNameInput: '#userName',
                    $passwordInput: '#password'
                },

                events: {
                    'click a[data-action="login"]': 'onLoginClick'
                },

                initialize: function() {
                    console.log("Entering LoginView initialize");
                    _.bindAll(this);

                    this.model = new Session();
                },

                onLoginClick: function(e) {
                    this.model.set('userName', this.ui.$userNameInput.val());
                    this.model.set('password', this.ui.$passwordInput.val());
                    this.nextUrl = $(e.target).attr('href');

                    app.native.login(
                        this.model.get('userName'),
                        this.model.get('password'))
                        .done(this.onLoginSuccess)
                        .fail(this.onLoginFailure);
                },

                onLoginSuccess: function() {
                    app.session = this.model;
                    app.router.triggerRoute(this.nextUrl);
                },

                onLoginFailure: function(error) {
                    alert("Login error!");
                }
            });

            return LoginView;
        }
    );
}());
