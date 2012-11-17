define(['jquery', 'underscore', 'backbone', 'text!html/HomeView.html'],
    function($, _, Backbone, HomeViewTemplate) {

        var HomeView = Backbone.View.extend({
            events: {
                'click #nextView': 'onNextViewClick'
            },

            render: function() {
                this.$el.html(_.template(HomeViewTemplate));
                return this;
            },

            onNextViewClick: function(event) {
                alert('You clicked next!');
            }
        });

        return HomeView;
    }
);
