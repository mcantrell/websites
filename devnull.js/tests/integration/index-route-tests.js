var should = require("should"),
    config = require("../../boot/config.js"),
    db = require("../../boot/database.js"),
    routes = require("../../routes/index.js");

require("./database-setup.js");


describe("Index Routes", function () {
    describe("#index()", function () {
        it("should provide a title and list of news records", function (done) {
            var response = {
                render: function (view, data) {
                    view.should.equal("index");
                    should.exist(data.newsList);
                    should.exist(data.markdown);
                    data.title.should.equal("Welcome");
                    data.newsList[0].title.should.equal("Man has Walked on the Moon!");
                    done();
                }
            };
            routes.index({}, response);
        });
    });
});

