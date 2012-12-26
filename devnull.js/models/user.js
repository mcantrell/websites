var mongoose = require("mongoose"),
    config = require("../boot/config.js");

var options = {
  collection: 'user'
};
var UserSchema = new mongoose.Schema({
    _id: String,
    provider: String,
    displayName: String,
    name: {
        familyName: String,
        givenName: String,
        middleName: String
    },
    emails : [{
        value: String,
        type: String,
        main: Boolean
    }]
}, options);

exports.User = mongoose.model("user", UserSchema);