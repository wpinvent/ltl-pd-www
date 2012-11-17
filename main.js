require.config({
    paths: {
        // Require.js plugins
        text: 'lib/require-2.1.1/text',
        domReady: 'lib/require-2.1.1/domReady',
        i18n: 'lib/require-2.1.1/i18n',

        // jQuery
        jquery: 'lib/jquery-1.8.2/jquery',

        // Underscore.js
        underscore: 'lib/underscore-1.4.2/underscore',

        // Backbone.js
        backbone: 'lib/backbone-0.9.2/backbone',

        // Twitter Bootstrap JavaScript
        bootstrap: 'lib/twitter-bootstrap-2.2.1/js/bootstrap'
    },

    shim: {
        jquery: {
            exports: '$'
        },

        backbone: {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },

        underscore: {
            exports: '_'
        },

        bootstrap: {
            deps: ['jquery'],
            exports: 'bootstrap'
        }
    }
});

require(['domReady', 'bootstrap', 'js/views/HomeView'],

    function (domReady, bootstrap, HomeView) {

        domReady(function () {

            // Function to run when Cordova is ready
            var onDeviceReady = function(desktop) {
                if (desktop !== true) {
                    cordova.exec(null, null, 'SplashScreen', 'hide', []);
                }

                // Show the HomeView
                var homeView = new HomeView().render();
                $('div#root').append(homeView.el);
            }

            // If running on a device, wait for deviceready, otherwise proceed
            if (navigator.userAgent.match(/(iPad|iPhone|Android)/)) {
                document.addEventListener('deviceready', onDeviceReady, false);
            }
            else {
                console.log('Running in desktop, bypassing deviceready');
                onDeviceReady(true);
            }
        });
    }
);
