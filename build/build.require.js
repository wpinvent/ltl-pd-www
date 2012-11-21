// See https://github.com/jrburke/r.js/blob/master/build/example.build.js
// All paths are relative to the location of this file
({
    baseUrl: "../intermediate",
    dir: "../publish",

    // TODO: Copied the paths in from main.js... not sure why r.js can't get the paths
    // from the main.js file...
    paths: {
        // Require.js plugins
        text: 'lib/require-2.1.1/text',
        domReady: 'lib/require-2.1.1/domReady',
        i18n: 'lib/require-2.1.1/i18n',
        tpl: 'lib/require-2.1.1/tpl',

        // jQuery
        jquery: 'lib/jquery-1.8.2/jquery',

        // Underscore
        underscore: 'lib/underscore-1.4.2/underscore',

        // Backbone
        backbone: 'lib/backbone-0.9.2/backbone',

        // Backbone.Marionette
        // Has AMD support built-in (doesn't need to be shimmed)
        marionette: 'lib/backbone.marionette-1.0.0-beta5-AMD/backbone.marionette',

        // Twitter Bootstrap JavaScript
        bootstrap: 'lib/twitter-bootstrap-2.2.1/js/bootstrap'
    },

    modules: [
        {
            name: "main"
        }
    ],


})
