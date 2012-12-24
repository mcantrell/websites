var should = require("should")
    , routes = require("../../routes/admin/news.js");


describe("News Routes", function(){
    describe("/news", function(){
        it("should provide a title and list of news records", function(done){
            var response = {
                render: function(view, data) {
                    view.should.equal("admin/news");
                    should.exist(data.newsList);
                    data.title.should.equal("News");
                    done();
                }
            };
            routes.index({}, response);
        });

    });
});