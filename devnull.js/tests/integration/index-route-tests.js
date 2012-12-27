var should = require("should"),
    config = require("../../boot/config.js"),
    db = require("../../boot/database.js"),
    routes = require("../../routes/index.js");

require("./database-setup.js");


describe("Index Routes", function () {
    describe("#index()", function () {
        it("should provide a title and list of news records sorted by date desc", function (done) {
            var response = {
                render: function (view, data) {
                    view.should.equal("index");
                    should.exist(data.newsList);
                    should.exist(data.markdown);
                    data.title.should.equal("Welcome");
                    data.newsList.length.should.equal(2);
                    data.newsList[0].happened.should.be.greaterThan(data.newsList[1].happened);
                    data.newsList[0].title.should.equal("Breakin 2: Electric Boogaloo");
                    data.newsList[1].title.should.equal("Man has Walked on the Moon!");
                    done();
                }
            };
            routes.index({}, response);
        });
    });
});

