var should = require("should"),
    routes = require("../../routes/admin/news.js");


describe("News Routes", function () {
    describe("GET /news", function () {
        it("should provide a title and list of news records", function (done) {
            var response = {
                render: function (view, data) {
                    view.should.equal("admin/news");
                    should.exist(data.newsList);
                    data.title.should.equal("News");
                    done();
                }
            };
            routes.index({}, response);
        });

    });
    describe("POST /news", function () {
        it("should persist a news article and redirect to list", function (done) {
            var response = {
                redirect: function (view) {
                    view.should.equal("/admin/news");
                    done();
                }
            };
            var request = {
                params: {
                    title: "test title",
                    content: "test content",
                    happened: "12/12/2012",
                    author: "test author"
                },
                param: function (name, defaultVal) {
                    return this.params[name] || defaultVal;
                }
            };
            routes.add(request, response);

        });

    });
});