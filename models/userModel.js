var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  // _id: Schema.Types.ObjectId,
  fullName: String,
  personalNumber: String,
  hierarchy: [String],
  primaryDomainUser: 
  {
    adfsUID: String,
    uniqueID: String
  },
  secondaryDomainUsers: 
  [
    {
    adfsUID: String,
    uniqueID: String
    }
  ],
  mail: String,
  avatarPath: String
});

UserSchema.set("versionKey", false);
var Users = mongoose.model("users", UserSchema);
module.exports = Users;
