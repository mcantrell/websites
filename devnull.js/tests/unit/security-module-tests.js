var should = require("should"),
    sinon = require("sinon"),
    sandbox = require('sandboxed-module'),
    config = require('../../boot/config.js');


describe('Security Service Unit Tests', function () {
    describe('#forGooglePassport()', function () {
        var passport = {
            use: function (strategy) {
                this.strategy = strategy;
                return this;
            },
            serializeUser: function (callback) {
                config.logger.info("serialization configured");
            },
            deserializeUser: function (callback) {
                config.logger.info("deserialization configured");
            }
        };
        var passportStrategy = {
            Strategy: function (options, userLookup) {
                this.options = options;
                this.userLookup = userLookup;
            }
        };
        var security = sandbox.require('../../lib/security', {
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
    describe("#lookupAuthenticatedUser", function () {
        var db = { };
        db.User = function () {
        };
        db.User.findById = function (id, callback) {
            if (id < 0) {
                callback(new Error("Invalid id " + id));
            }
            else {
                var users = {
                    1: { id: 1, displayName: "test user"}
                };
                callback(null, users[id]);
            }
        };
        var security = sandbox.require('../../lib/security', {
            requires: {
                '../../boot/database.js': db,
                'passport': {},
                'passport-google': {}
            }
        });
        it('should query user model by given identifier', function (done) {
            security.lookupAuthenticatedUser(1, null, function (err, user) {
                should.not.exist(err);
                user.id.should.equal(1);
                done();
            });
        });
        it('should return null if record does not exist', function (done) {
            security.lookupAuthenticatedUser(2, null, function (err, user) {
                should.not.exist(err);
                should.not.exist(user);
                done();
            });
        });
        it('should provide error if unable to complete operation', function (done) {
            security.lookupAuthenticatedUser(-1, null, function (err, user) {
                should.not.exist(user);
                should.exist(err);
                done();
            });
        });
    })
});