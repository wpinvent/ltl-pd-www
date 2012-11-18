define(['jquery', 'underscore', 'backbone', 'text!html/LoginView.html'],

    function($, _, Backbone, Template) {
        console.log('Entering js/views/LoginView');

        var LoginView = Backbone.View.extend({
            events: {
                'click #login': 'onLoginClick'
            },

            render: function() {
                this.$el.html(_.template(Template));
                return this;
            },

            onLoginClick: function(event) {
                var userName = $('#userName').val(),
                    password = $('#password').val();

                app.native.login(userName, password, this.onLoginSuccess, this.onLoginFailure);
            },

            onLoginSuccess: function() {
                alert("Logged in!");
            },

            onLoginFailure: function() {
                alert("Login error!");
            }
        });

        return LoginView;
    }
);
