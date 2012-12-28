var should = require("should"),
    SandboxedModule = require('sandboxed-module'),
    config = require('../../boot/config.js');


describe('Security Service Unit Tests', function () {
    describe('#forGooglePassport()', function () {
        var passport = {
            use: function(strategy) {
                this.strategy = strategy;
                return this;
            },
            serializeUser: function(callback) {
                config.logger.info("serialization configured");
            },
            deserializeUser: function(callback) {
                config.logger.info("deserialization configured");
            }
        };
        var passportStrategy = {
            Strategy: function(options, userLookup) {
                this.options = options;
                this.userLookup = userLookup;
            }
        };
        var security = SandboxedModule.require('../../lib/security', {
            requires: {
                '../../boot/database.js': { },
                'passport': passport,
                'passport-google': passportStrategy
            }
        });

        it('should register correct strategy with passport', function () {
            security.forGooglePassport();
            passport.strategy.options.returnURL.should.equal(config.passport.returnUrl);
            passport.strategy.options.realm.should.equal(config.passport.realm);
            should.exist(passport.strategy.userLookup);
        });
    });
});