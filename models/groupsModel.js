var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var GroupSchema = new Schema({
  name: String,
  people: [{ type: Schema.Types.ObjectId, ref: "users" }],
  admins: [{ type: Schema.Types.ObjectId, ref: "users" }],
  imgPath: String,
  description: String
});
GroupSchema.set("versionKey", false);
var Groups = mongoose.model("Groups", GroupSchema);
module.exports = Groups;
