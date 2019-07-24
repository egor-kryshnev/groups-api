var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  _id: Schema.Types.ObjectId,
  name: String,
  number: String,
  avatarPath: String,
  email: String
});

UserSchema.set("versionKey", false);
var Users = mongoose.model("users", UserSchema);
module.exports = Users;
