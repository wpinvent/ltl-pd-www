define(['jquery', 'underscore', 'backbone', 'text!html/AboutView.html'],

    function($, _, Backbone, Template) {
        console.log('Entering js/views/AboutView');

        var AboutView = Backbone.View.extend({
            events: {
                'click #nextView': 'onNextViewClick'
            },

            render: function() {
                this.$el.html(_.template(Template));
                return this;
            },

            onNextViewClick: function(event) {
                alert('You clicked next!');
            }
        });

        return AboutView;
    }
);