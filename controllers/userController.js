var Users = require("../models/userModel");
var exports = module.exports;

exports.CreateUser = function(req, res) {
  var user = new Users(req.body);
  user.save(err => {
    if (err) throw err;
  });
  res.json({ message: "User created!" });
};

exports.GetAllUsers = function(req, res) {
  users.find({}, (err, Users) => {
    if (err) throw err;
    res.send(Users);
  });
};
