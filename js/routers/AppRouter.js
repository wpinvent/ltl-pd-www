define([
    'jquery',
    'underscore',
    'backbone',
    'js/views/LoginView',
    'js/views/AboutView'],

    function(
        $,
        _,
        Backbone,
        LoginView,
        AboutView
        ) {

        console.log('Entering js/routers/AppRouter');

        var AppRouter = Backbone.Router.extend({

            initialize: function() {
                console.log('Entering AppRouter.initialize')
            },

            routes: {
                '': 'index',
                'login': 'login',
                'about': 'about',
                '*other': 'default'
            },

            index: function() {
                // ?
            },

            login: function() {
                this.goTo(LoginView);
            },

            about: function() {
                this.goTo(AboutView);
            },

            default: function(other) {
                console.log("Invalid route: " + other);
            },

            /**
             * Construct, render, and navigate to the given view.  (View should be a Backbone View constructor function)
             */
            goTo: function(View) {
                var view = new View().render();
                $('div#root').html(view.el);
            }
        });

        return AppRouter;
    }
);
