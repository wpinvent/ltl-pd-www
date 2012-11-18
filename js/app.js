/**
 * app - central application configuration settings and utilities
 */
define(['jquery', 'underscore', 'backbone', 'js/routers/AppRouter', 'js/utils/DesktopNative', 'js/utils/CordovaNative'],

    function($, _, Backbone, AppRouter, DesktopNative, CordovaNative) {
        console.log('Entering js/app');

        var App = function() {
            console.log('Entering js/App ctor');
            var self = this;

            self.root = 'login';

            self.initialize = function(isDesktop) {
                self.native = isDesktop ? new DesktopNative() : new CordovaNative();
                self.router = new AppRouter();
                self.router.app = self;
            };

            self.start = function(isDesktop) {
                self.router.navigate(self.root, { trigger: true});
            };
        };

        return new App();
    }
);