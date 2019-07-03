var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var GroupSchema = new Schema({
  name: String,
  people: [{
    name: String,
    number: String,
    admin: Boolean
  }],
  imgPath: String
});
GroupSchema.set("versionKey", false);
var Groups = mongoose.model("Groups", GroupSchema);

module.exports = Groups;
