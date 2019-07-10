var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: String,
  number: String,
  avatarPath: String
});

UserSchema.set("versionKey", false);
var Users = mongoose.model("users", UserSchema);
module.exports = Users;
