var should = require("should"),
    config = require("../../boot/config.js"),
    security = require("../../lib/security");

require("./database-setup.js");


describe("Security Module", function () {
    describe("#lookupAuthenticatedUser()", function () {
        it("should find user from database with the correct identifier", function (done) {
            var identifier = "http://devnull.org/users/testUser";
            security.lookupAuthenticatedUser(identifier, {familyName: "McUser"}, function (error, user) {
                should.not.exist(error);
                user.id.should.equal(identifier);
                done();
            });
        });
    });
});

