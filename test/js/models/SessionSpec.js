/*global define, describe, expect, it*/

(function() {
    'use strict';

    define(['../../../src/js/models/Session'], function(Session) {

        describe('Session model', function() {

            it('should be constructable', function() {
                var session = new Session();

                expect(session).not.toBeNull();
            });
        });
    });

}());
