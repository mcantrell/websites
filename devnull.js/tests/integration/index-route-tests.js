var should = require("should"),
    config = require("../../boot/config.js"),
    mongoose = require("mongoose"),
    News = mongoose.model(config.model.News),
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
                    done();
                }
            };
            routes.index({}, response);
        });
    });
});

